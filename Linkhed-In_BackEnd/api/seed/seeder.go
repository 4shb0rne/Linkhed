package seed

import (
	"log"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/models"
	"github.com/jinzhu/gorm"
)

var users = []models.User{
	models.User{
		Firstname:         "William",
		Lastname:          "William",
		Email:             "william@gmail.com",
		Password:          "william123",
		ProfilePicture:    "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
		Headline:          "Student at somewhere",
	},
	models.User{
		Firstname:         "user",
		Lastname:          "user",
		Email:             "user@gmail.com",
		Password:          "user123",
		ProfilePicture:    "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
		Headline:          "Student at somewhere",
	},
}

var posts = []models.Post{
	models.Post{
		Content: "Hello world 1",
	},
	models.Post{
		Content: "Hello world 2",
	},
}

func Load(db *gorm.DB) {

	err := db.Debug().DropTableIfExists(&models.Post{}, &models.Education{}, &models.User{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}
	err = db.Debug().AutoMigrate(&models.User{}, &models.Post{}, &models.Education{}).Error
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}

	/*
		err = db.Debug().Model(&models.Post{}).AddForeignKey("author_id", "users(id)", "cascade", "cascade").Error
		if err != nil {
			log.Fatalf("attaching foreign key error: %v", err)
		}
	*/

	for i := range users {
		err = db.Debug().Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			log.Fatalf("cannot seed users table: %v", err)
		}
		posts[i].AuthorID = users[i].ID

		err = db.Debug().Model(&models.Post{}).Create(&posts[i]).Error
		if err != nil {
			log.Fatalf("cannot seed posts table: %v", err)
		}
	}
}
