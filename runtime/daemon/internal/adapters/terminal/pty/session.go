package pty

type Session struct {
	ID         string `json:"id"`
	WorkingDir string `json:"workingDir"`
	Shell      string `json:"shell"`
}

func NewSession(id, workingDir, shell string) Session {
	return Session{
		ID:         id,
		WorkingDir: workingDir,
		Shell:      shell,
	}
}
