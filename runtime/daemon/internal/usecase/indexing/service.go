package indexing

type Request struct {
	WorkspaceRoot string `json:"workspaceRoot"`
	Force         bool   `json:"force"`
}

type Service struct{}

func NewService() Service {
	return Service{}
}

func (Service) Start(request Request) map[string]any {
	return map[string]any{
		"workspaceRoot": request.WorkspaceRoot,
		"status":        "queued",
	}
}
