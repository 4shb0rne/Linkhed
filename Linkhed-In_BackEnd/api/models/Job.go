package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Job struct {
	gorm.Model
	JobPicture string
	JobTitle       string
	JobDescription string
	Company        string
	WorkplaceType  string
	JobLocation    string
	EmploymentType string
	UserID         uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
}

func (j *Job) Validate() error {

	if j.JobTitle == "" {
		return errors.New("required job title")
	}
	if j.JobDescription == "" {
		return errors.New("required job description")
	}
	if j.Company == "" {
		return errors.New("required company")
	}
	if j.JobLocation == "" {
		return errors.New("required job location")
	}
	return nil
}

func (j *Job) AddJob(db *gorm.DB) (*Job, error) {
	var err error = db.Debug().Model(&Job{}).Create(&j).Error
	if err != nil {
		return &Job{}, err
	}
	return j, nil
}

func (j *Job) GetJobs(db *gorm.DB, uid uint64) (*[]Job, error) {
	var err error
	jobs := []Job{}
	err = db.Debug().Model(&Job{}).Where("user_id = ?", uid).Find(&jobs).Error
	if err != nil {
		return &[]Job{}, err
	}
	return &jobs, nil
}

func (j *Job) GetAllJobs(db *gorm.DB) (*[]Job, error) {
	var err error
	jobs := []Job{}
	err = db.Debug().Model(&Job{}).Find(&jobs).Error
	if err != nil {
		return &[]Job{}, err
	}
	return &jobs, nil
}