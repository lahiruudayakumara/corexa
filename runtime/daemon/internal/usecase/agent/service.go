package agent

type Task struct {
	ID        string   `json:"id"`
	Role      string   `json:"role"`
	Objective string   `json:"objective"`
	Steps     []string `json:"steps"`
}

type Service struct{}

func NewService() Service {
	return Service{}
}

func (Service) Plan(task Task) []string {
	return []string{
		"load workspace context",
		"retrieve relevant memory",
		"execute agent policy",
		"emit structured result",
	}
}
