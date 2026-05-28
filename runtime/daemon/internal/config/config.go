package config

import (
	"fmt"
	"os"
)

type Config struct {
	Host         string
	Port         string
	InferenceURL string
	QdrantURL    string
	DefaultModel string
}

func Load() Config {
	return Config{
		Host:         env("COREXA_RUNTIME_HOST", "127.0.0.1"),
		Port:         env("COREXA_RUNTIME_PORT", "7777"),
		InferenceURL: env("COREXA_INFERENCE_URL", "http://127.0.0.1:11434"),
		QdrantURL:    env("COREXA_QDRANT_URL", "http://127.0.0.1:6333"),
		DefaultModel: env("COREXA_DEFAULT_MODEL", "corexa-code-fast"),
	}
}

func (c Config) HTTPAddress() string {
	return fmt.Sprintf("%s:%s", c.Host, c.Port)
}

func env(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	return value
}
