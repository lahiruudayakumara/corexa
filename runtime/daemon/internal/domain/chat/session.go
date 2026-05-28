package chat

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type CompletionRequest struct {
	Model    string            `json:"model"`
	Messages []Message         `json:"messages"`
	Metadata map[string]string `json:"metadata"`
}
