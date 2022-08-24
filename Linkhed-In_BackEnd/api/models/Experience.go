package models

import "github.com/jinzhu/gorm"

type Experience struct {
	gorm.Model
	Title string
	EmploymentType string
	CompanyName string
	Location string
	Industry string
	StartMonth uint32
	StartYear uint32
	EndMonth uint32
	EndYear uint32
}