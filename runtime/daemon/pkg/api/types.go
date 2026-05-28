package api

type ChatStreamEvent struct {
	Type    string `json:"type"`
	Content string `json:"content"`
}
