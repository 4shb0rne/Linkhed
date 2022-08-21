package seed

import (
	"log"

	"github.com/4shb0rne/Linkhed-In_BackEnd/api/models"
	"github.com/jinzhu/gorm"
)

var users = []models.User{
	models.User{
		Firstname: "Steve",
		Lastname:  "Jobs",
		Email:     "steven@gmail.com",
		Password:  "password",
		ProfilePicture : "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
	},
	models.User{
		Firstname: "Martin",
		Lastname:  "Luther",
		Email:     "luther@gmail.com",
		Password:  "password",
		ProfilePicture : "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
	},
}

var posts = []models.Post{
	models.Post{
		Title:   "Title 1",
		Content: "Hello world 1",
	},
	models.Post{
		Title:   "Title 2",
		Content: "Hello world 2",
	},
}

func Load(db *gorm.DB) {

	err := db.Debug().DropTableIfExists(&models.Post{}, &models.User{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}
	err = db.Debug().AutoMigrate(&models.User{}, &models.Post{}).Error
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
