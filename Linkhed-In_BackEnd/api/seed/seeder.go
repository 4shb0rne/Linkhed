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
		City:              "Tangerang",
		Country:           "Indonesia",
		Verified: true,
	},
	models.User{
		Firstname:         "user",
		Lastname:          "user",
		Email:             "user@gmail.com",
		Password:          "user123",
		ProfilePicture:    "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
		Headline:          "Student at somewhere",
		City:              "Tangerang",
		Country:           "Indonesia",
		Verified: true,
	},
	models.User{
		Firstname:         "ash",
		Lastname:          "ash",
		Email:             "ash@gmail.com",
		Password:          "ash123",
		ProfilePicture:    "blank_bjt7w5.png",
		BackgroundPicture: "defaultbackground_adjqkt.jpg",
		Headline:          "Student at somewhere",
		City:              "Tangerang",
		Country:           "Indonesia",
		Verified: true,
	},
}

var posts = []models.Post{
	models.Post{
		Content: "Hello world 1",
	},
	models.Post{
		Content: "Hello world 2",
	},
	models.Post{
		Content: "Hello world 3",
	},
}

var connections = []models.UserConnections{
	models.UserConnections{
		UserID: 1,
		ConnectionID: 2,
	},
	models.UserConnections{
		UserID: 2,
		ConnectionID: 1,
	},
	models.UserConnections{
		UserID: 2,
		ConnectionID: 3,
	},
	models.UserConnections{
		UserID: 3,
		ConnectionID: 2,
	},
}

func Load(db *gorm.DB) {

	err := db.Debug().DropTableIfExists(&models.UserPosts{}, &models.Invitation{}, &models.UserComments{}, &models.UserConnections{}, &models.Reply{}, &models.Notification{}, &models.Comment{}, &models.Post{}, &models.Education{}, &models.Experience{}, &models.Job{}, &models.Follower{}, &models.Block{}, &models.Chat{}, &models.ChatHistory{}, &models.User{}).Error
	if err != nil {
		log.Fatalf("cannot drop table: %v", err)
	}
	err = db.Debug().AutoMigrate(&models.User{}, &models.Post{}, &models.Education{}, &models.Experience{}, &models.Comment{}, &models.Reply{}, &models.UserPosts{}, &models.UserComments{}, &models.UserConnections{}, &models.Invitation{}, &models.Notification{}, &models.Job{}, &models.Follower{}, &models.Block{}, &models.Chat{}, &models.ChatHistory{}).Error
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
		posts[i].UserID = users[i].ID

		err = db.Debug().Model(&models.Post{}).Create(&posts[i]).Error
		if err != nil {
			log.Fatalf("cannot seed posts table: %v", err)
		}
	}
	for i := range connections{
		err = db.Debug().Model(&models.UserConnections{}).Create(&connections[i]).Error
		if err != nil {
			log.Fatalf("cannot seed users table: %v", err)
		}
	}
}
