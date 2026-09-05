package com.student.studentmanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;

    public JwtService(
            @Value("${jwt.secret}") String secret
    ) {
        this.key = Keys.hmacShaKeyFor(
                secret.getBytes()
        );
    }

    // Generate JWT Token
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        )
                )
                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    // Extract username from token
    public String extractUsername(String token) {

        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();
    }

    // Check if token is valid
    public boolean isTokenValid(
            String token,
            String username
    ) {

        return extractUsername(token)
                .equals(username);
    }
}