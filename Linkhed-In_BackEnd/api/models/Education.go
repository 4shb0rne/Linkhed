package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Education struct {
	gorm.Model
	UserID       uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	School       string
	Degree       string
	FieldOfStudy string
	StartYear    uint32
	EndYear      uint32
	Activities   string
	Description  string
}

func (e *Education) Prepare() {
	e.ID = 0
	e.School = html.EscapeString(strings.TrimSpace(e.School))
	e.Degree = html.EscapeString(strings.TrimSpace(e.Degree))
	e.FieldOfStudy = html.EscapeString(strings.TrimSpace(e.FieldOfStudy))
	e.Activities = html.EscapeString(strings.TrimSpace(e.Activities))
	e.Description = html.EscapeString(strings.TrimSpace(e.Description))
}

func (e *Education) Validate() error {

	if e.School == "" {
		return errors.New("required school")
	}
	if e.Degree == "" {
		return errors.New("required degree")
	}
	if e.FieldOfStudy == "" {
		return errors.New("required field of study")
	}
	if e.StartYear == 0 {
		return errors.New("required start year")
	}
	if e.EndYear == 0 {
		return errors.New("required end year")
	}
	return nil
}

func (e *Education) AddEducation(db *gorm.DB) (*Education, error) {
	var err error = db.Debug().Model(&Education{}).Create(&e).Error
	if err != nil {
		return &Education{}, err
	}
	return e, nil
}
func (e *Education) GetEducations(db *gorm.DB, pid uint64) (*[]Education, error) {
	var err error
	educations := []Education{}
	err = db.Debug().Model(&Education{}).Where("user_id = ?", pid).Find(&educations).Error
	if err != nil {
		return &[]Education{}, err
	}
	return &educations, nil
}

func (e *Education) UpdateEducation(db *gorm.DB, pid uint32) (*Education, error) {

	var err error
	err = db.Debug().Model(&Education{}).Where("id = ?", pid).UpdateColumns(
		map[string]interface{}{
			"school":  e.School,
			"degree":   e.Degree,
			"field_of_study":   e.FieldOfStudy,
			"start_year":    e.StartYear,
			"end_year":       e.EndYear,
			"activities":   e.Activities,
			"description": e.Description,
			"updated_at": time.Now(),
		},
	).Error
	if err != nil {
		return &Education{}, err
	}
	return e, nil
}