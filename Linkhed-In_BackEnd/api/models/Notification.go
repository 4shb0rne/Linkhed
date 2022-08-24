package models

import "github.com/jinzhu/gorm"

type Notification struct {
	gorm.Model
	UserID uint32 `sql:"type:int REFERENCES users(id)" json:"user_id"`
	Content    string    `gorm:"size:255;not null;" json:"content"`
}