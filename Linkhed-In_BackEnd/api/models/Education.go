package models;

import (
	"github.com/jinzhu/gorm"
	"time"
	"errors"
)

type Education struct{
	gorm.Model
	User User
	UserID uint32
	School string
	Degree string
	FieldOfStudy string
	StartDate time.Time
	EndDate time.Time
	Activities string
	Description string
}


func (e *Education) Prepare() {

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
	if e.StartDate.IsZero() {
		return errors.New("required start date")
	}
	if e.EndDate.IsZero() {
		return errors.New("required end date")
	}
	return nil
}

func (e *Education) AddEducation(db *gorm.DB) (*Education, error) {
	var err error
	err = db.Debug().Model(&Education{}).Create(&e).Error
	if err != nil {
		return &Education{}, err
	}
	if e.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", e.UserID).Take(&e.User).Error
		if err != nil {
			return &Education{}, err
		}
	}
	return e, nil
}

