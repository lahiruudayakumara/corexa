package qdrant

type Client struct {
	BaseURL string
}

func New(baseURL string) Client {
	return Client{BaseURL: baseURL}
}

func (Client) Health() string {
	return "ready"
}
