package controllers

import (
	"net/http"
)

func (server *Server) CreateNotification(w http.ResponseWriter, r *http.Request) {

	// body, err := ioutil.ReadAll(r.Body)
	// if err != nil {
	// 	responses.ERROR(w, http.StatusUnprocessableEntity, err)
	// 	return
	// }
	// notification := models.Notification{}
	// err = json.Unmarshal(body, &notification)
	// if err != nil {
	// 	responses.ERROR(w, http.StatusUnprocessableEntity, err)
	// 	return
	// }
	// post.Prepare()
	// err = post.Validate()
	// if err != nil {
	// 	responses.ERROR(w, http.StatusUnprocessableEntity, err)
	// 	return
	// }
	// if err != nil {
	// 	responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
	// 	return
	// }
	// postCreated, err := post.SavePost(server.DB)
	// if err != nil {
	// 	formattedError := formaterror.FormatError(err.Error())
	// 	responses.ERROR(w, http.StatusInternalServerError, formattedError)
	// 	return
	// }
	// w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, postCreated.ID))
	// responses.JSON(w, http.StatusCreated, postCreated)
}