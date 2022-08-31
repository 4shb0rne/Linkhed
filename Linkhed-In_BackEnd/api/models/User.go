package models

import (
	"errors"
	"fmt"
	"html"
	"log"
	"strings"
	"time"

	"github.com/badoux/checkmail"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID                uint32     `gorm:"primary_key;auto_increment" json:"id"`
	Firstname         string     `gorm:"size:255;" json:"firstname"`
	Lastname          string     `gorm:"size:255;" json:"lastname"`
	Email             string     `gorm:"size:100;not null;unique" json:"email"`
	Password          string     `gorm:"size:100;not null;" json:"password"`
	ProfilePicture    string     `gorm:"size:255;" json:"profile_picture"`
	Headline          string     `gorm:"size:255;" json:"Headline"`
	Industry          string     `gorm:"size:100;" json:"Industry"`
	Country           string     `gorm:"size:100;" json:"Country"`
	City              string     `gorm:"size:100;" json:"City"`
	BackgroundPicture string     `gorm:"size:255;" json:"background_picture"`
	PostsLikes        []*Post    `gorm:"many2many:user_posts;"`
	CommentLikes      []*Comment `gorm:"many2many:user_comments;"`
	Connections       []*User    `gorm:"many2many:user_connections;association_jointable_foreignkey:connection_id"`
	ProfileVisited    uint32
	CreatedAt         time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt         time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

type SearchQuery struct {
	Content string
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func (u *User) BeforeSave() error {
	hashedPassword, err := Hash(u.Password)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) Prepare() {
	u.ID = 0
	u.Firstname = html.EscapeString(strings.TrimSpace(u.Firstname))
	u.Lastname = html.EscapeString(strings.TrimSpace(u.Lastname))
	u.Industry = html.EscapeString(strings.TrimSpace(u.Industry))
	u.Country = html.EscapeString(strings.TrimSpace(u.Country))
	u.City = html.EscapeString(strings.TrimSpace(u.City))
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func (u *User) PrepareCreate() {
	u.ID = 0
	u.Firstname = html.EscapeString(strings.TrimSpace(u.Firstname))
	u.Lastname = html.EscapeString(strings.TrimSpace(u.Lastname))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.ProfilePicture = "blank_bjt7w5"
	u.BackgroundPicture = "defaultbackground_adjqkt.jpg"
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

func (u *User) Validate(action string) error {
	switch strings.ToLower(action) {
	case "update":
		if u.Firstname == "" {
			return errors.New("required firstname")
		}
		if u.Lastname == "" {
			return errors.New("required lastname")
		}
		if u.Headline == "" {
			return errors.New("required headline")
		}
		if u.Industry == "" {
			return errors.New("required industry")
		}
		if u.Country == "" {
			return errors.New("required country")
		}
		if u.City == "" {
			return errors.New("required city")
		}
		return nil
	case "login":
		if u.Password == "" {
			return errors.New("Required Password")
		}
		if u.Email == "" {
			return errors.New("Required Email")
		}
		if err := checkmail.ValidateFormat(u.Email); err != nil {
			return errors.New("Invalid Email")
		}
		return nil

	default:
		if u.Password == "" {
			return errors.New("Required Password")
		}
		if u.Email == "" {
			return errors.New("Required Email")
		}
		if err := checkmail.ValidateFormat(u.Email); err != nil {
			return errors.New("Invalid Email")
		}
		return nil
	}
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {

	var err error = db.Debug().Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) FindAllUsers(db *gorm.DB) (*[]User, error) {
	var err error
	users := []User{}
	err = db.Debug().Model(&User{}).Preload("PostsLikes").Preload("CommentLikes").Preload("Connections").Find(&users).Error
	if err != nil {
		return &[]User{}, err
	}
	return &users, err
}

func (u *User) FindUserByID(db *gorm.DB, uid uint32) (*User, error) {
	var err error = db.Debug().Model(User{}).Where("id = ?", uid).Preload("PostsLikes").Preload("CommentLikes").Preload("Connections").Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	if gorm.IsRecordNotFoundError(err) {
		return &User{}, errors.New("User Not Found")
	}
	return u, err
}

func (u *User) UpdateAUser(db *gorm.DB, uid uint32) (*User, error) {
	err := u.BeforeSave()
	if err != nil {
		log.Fatal(err)
	}
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).UpdateColumns(
		map[string]interface{}{
			"firstname":  u.Firstname,
			"lastname":   u.Lastname,
			"industry":   u.Industry,
			"country":    u.Country,
			"city":       u.City,
			"headline":   u.Headline,
			"updated_at": time.Now(),
		},
	)
	if db.Error != nil {
		return &User{}, db.Error
	}
	// This is the display the updated user
	err = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) UpdateVisited(db *gorm.DB, uid uint32, counts uint32) (*User, error) {
	err := u.BeforeSave()
	if err != nil {
		log.Fatal(err)
	}
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Update("profile_visited", counts)
	if db.Error != nil {
		return &User{}, db.Error
	}
	// This is the display the updated user
	err = db.Debug().Model(&User{}).Where("id = ?", uid).Preload("PostsLikes").Preload("CommentLikes").Preload("Connections").Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) UpdateProfilePicture(db *gorm.DB, uid uint32) (*User, error) {
	err := u.BeforeSave()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Print(u.ProfilePicture)
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Update(
		"profile_picture", u.ProfilePicture,
	)
	if db.Error != nil {
		return &User{}, db.Error
	}
	// This is the display the updated user
	err = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) UpdateBackgroundPicture(db *gorm.DB, uid uint32) (*User, error) {
	err := u.BeforeSave()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Print(u.ProfilePicture)
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Update(
		"background_picture", u.BackgroundPicture,
	)
	if db.Error != nil {
		return &User{}, db.Error
	}
	// This is the display the updated user
	err = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) DeleteAUser(db *gorm.DB, uid uint32) (int64, error) {

	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Delete(&User{})

	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}

func (u *User) SearchUser(db *gorm.DB, query SearchQuery) (*[]User, error) {
	var err error
	users := []User{}
	err = db.Debug().Model(&User{}).Where("firstname ILIKE ? OR lastname ILIKE ?", "%"+query.Content+"%", "%"+query.Content+"%").Preload("Connections").Preload("PostsLikes").Preload("CommentLikes").Find(&users).Error
	if err != nil {
		return &[]User{}, err
	}
	return &users, err
}
