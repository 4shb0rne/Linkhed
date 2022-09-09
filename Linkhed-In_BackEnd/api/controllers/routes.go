package controllers

import "github.com/4shb0rne/Linkhed-In_BackEnd/api/middlewares"

func (s *Server) initializeRoutes() {

	// Home Route
	s.Router.HandleFunc("/", middlewares.SetMiddlewareJSON(s.Home)).Methods("GET")

	// Login Route
	s.Router.HandleFunc("/login", middlewares.SetMiddlewareJSON(s.Login)).Methods("POST")
	s.Router.HandleFunc("/register", middlewares.SetMiddlewareJSON(s.CreateUser)).Methods("POST")

	//Users routes
	s.Router.HandleFunc("/getuser", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.GetCurrentUser))).Methods("GET")
	s.Router.HandleFunc("/updateprofileview/{id}/{count}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdateProfileViews))).Methods("GET")
	s.Router.HandleFunc("/users", middlewares.SetMiddlewareJSON(s.GetUsers)).Methods("GET")
	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareJSON(s.GetUser)).Methods("GET")
	s.Router.HandleFunc("/users/{id}", middlewares.SetMiddlewareAuthentication(s.DeleteUser)).Methods("DELETE")
	s.Router.HandleFunc("/updateprofilepicture/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdateProfilePicture))).Methods("POST")
	s.Router.HandleFunc("/updatebackgroundpicture/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdateBackgroundPicture))).Methods("POST")
	s.Router.HandleFunc("/updateprofile/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdateUser))).Methods("PUT")
	s.Router.HandleFunc("/addeducation", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddEducation))).Methods("POST")
	s.Router.HandleFunc("/educations/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.GetEducation))).Methods("GET")
	s.Router.HandleFunc("/addexperience", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddExperience))).Methods("POST")
	s.Router.HandleFunc("/experiences/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.GetExperience))).Methods("GET")
	//Posts routes
	s.Router.HandleFunc("/addpost", middlewares.SetMiddlewareJSON(s.CreatePost)).Methods("POST")

	s.Router.HandleFunc("/addcomment", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddComment))).Methods("POST")
	s.Router.HandleFunc("/deletecomment/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DeleteComment))).Methods("DELETE")

	s.Router.HandleFunc("/addreply", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddReply))).Methods("POST")
	s.Router.HandleFunc("/deletereply/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DeleteReply))).Methods("DELETE")

	s.Router.HandleFunc("/likepost", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.LikePost))).Methods("POST")
	s.Router.HandleFunc("/dislikepost/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DislikePost))).Methods("DELETE")
	s.Router.HandleFunc("/likecomment", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.LikeComment))).Methods("POST")
	s.Router.HandleFunc("/dislikecomment/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DislikeComment))).Methods("DELETE")
	s.Router.HandleFunc("/replies/{id}", middlewares.SetMiddlewareJSON(s.GetReplies)).Methods("GET")
	s.Router.HandleFunc("/comments/{id}", middlewares.SetMiddlewareJSON(s.GetComments)).Methods("GET")
	s.Router.HandleFunc("/posts/{id}", middlewares.SetMiddlewareJSON(s.GetPosts)).Methods("GET")
	s.Router.HandleFunc("/post/{id}", middlewares.SetMiddlewareJSON(s.GetPost)).Methods("GET")
	s.Router.HandleFunc("/posts/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.UpdatePost))).Methods("PUT")
	s.Router.HandleFunc("/deletepost/{id}", middlewares.SetMiddlewareAuthentication(s.DeletePost)).Methods("DELETE")

	//Search
	s.Router.HandleFunc("/searchuser", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.SearchUser))).Methods("POST")
	s.Router.HandleFunc("/searchpost", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.SearchPost))).Methods("POST")

	s.Router.HandleFunc("/connectuser", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.ConnectUser))).Methods("POST")
	s.Router.HandleFunc("/disconnectuser/{uid}/{pid}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DisconnectUser))).Methods("DELETE")

	s.Router.HandleFunc("/sendinvitation", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddInvitation))).Methods("POST")
	s.Router.HandleFunc("/deleteinvitation/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DeleteInvitation))).Methods("DELETE")

	s.Router.HandleFunc("/addnotification", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddNotification))).Methods("POST")
	s.Router.HandleFunc("/getnotification/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.GetNotification))).Methods("GET")
	s.Router.HandleFunc("/deletenotification/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.DeleteNotification))).Methods("DELETE")

	s.Router.HandleFunc("/addjob", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.AddJob))).Methods("POST")
	s.Router.HandleFunc("/getjobs/{id}", middlewares.SetMiddlewareJSON(middlewares.SetMiddlewareAuthentication(s.GetJobs))).Methods("GET")
}
