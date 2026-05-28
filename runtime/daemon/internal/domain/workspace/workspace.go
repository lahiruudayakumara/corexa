package workspace

type Summary struct {
	ID               string   `json:"id"`
	Name             string   `json:"name"`
	RootPath         string   `json:"rootPath"`
	Languages        []string `json:"languages"`
	RepositoryStatus string   `json:"repositoryStatus"`
}
