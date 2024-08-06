package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {
	public LocalDateTime createdOn;
	
	public LocalDateTime updatedOn;
}
