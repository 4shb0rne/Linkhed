package models

type User struct {
	userid        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	username  string    `gorm:"size:255;not null;unique" json:"username"`
	userpassword     string    `gorm:"size:100;not null;unique" json:"email"`
	useremail  string    `gorm:"size:100;not null;" json:"password"`
}
