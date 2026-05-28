package ipc

type Server struct {
	Name string
}

func New() Server {
	return Server{Name: "corexa-ipc"}
}
