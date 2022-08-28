package models

import (
	"errors"
	"html"
	"strings"

	"github.com/jinzhu/gorm"
)

type Experience struct {
	gorm.Model
	UserID         uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	Title          string
	EmploymentType string
	CompanyName    string
	Location       string
	Industry       string
	StartMonth     uint32	
	StartYear      uint32
	EndMonth       uint32
	EndYear        uint32
}

func (e *Experience) Prepare() {
	e.ID = 0
	e.Title = html.EscapeString(strings.TrimSpace(e.Title))
	e.EmploymentType = html.EscapeString(strings.TrimSpace(e.EmploymentType))
	e.CompanyName = html.EscapeString(strings.TrimSpace(e.CompanyName))
	e.Location = html.EscapeString(strings.TrimSpace(e.Location))
	e.Industry = html.EscapeString(strings.TrimSpace(e.Industry))
}

func (e *Experience) Validate() error {

	if e.Title == "" {
		return errors.New("required title")
	}
	if e.EmploymentType == "" {
		return errors.New("required employment type")
	}
	if e.CompanyName == "" {
		return errors.New("required company name")
	}
	if e.Location == "" {
		return errors.New("required location")
	}
	if e.Industry == "" {
		return errors.New("required industry")
	}
	if e.StartYear == 0 {
		return errors.New("required start year")
	}
	if e.StartMonth == 0 {
		return errors.New("required start month")
	}
	return nil
}

func (e *Experience) AddExperience(db *gorm.DB) (*Experience, error) {
	var err error = db.Debug().Model(&Experience{}).Create(&e).Error
	if err != nil {
		return &Experience{}, err
	}
	return e, nil
}
func (e *Experience) GetExperiences(db *gorm.DB, pid uint64) (*[]Experience, error) {
	var err error
	experiences := []Experience{}
	err = db.Debug().Model(&Experience{}).Where("user_id = ?", pid).Find(&experiences).Error
	if err != nil {
		return &[]Experience{}, err
	}
	return &experiences, nil
}
