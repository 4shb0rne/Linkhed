package models;

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Education struct{
	gorm.Model
	User User
	School string
	Degree string
	FieldOfStudy string
	StartDate time.Time
	EndDate time.Time
	Activities string
	Description string
}