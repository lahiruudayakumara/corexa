package model

type Capability string

const (
	CapabilityChat      Capability = "chat"
	CapabilityEmbedding Capability = "embedding"
	CapabilityTools     Capability = "tools"
	CapabilityCode      Capability = "code"
)

type Descriptor struct {
	ID            string       `json:"id"`
	Provider      string       `json:"provider"`
	Family        string       `json:"family"`
	ContextWindow int          `json:"contextWindow"`
	Capabilities  []Capability `json:"capabilities"`
	Local         bool         `json:"local"`
}
