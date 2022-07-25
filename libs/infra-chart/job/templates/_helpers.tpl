{{/* vim: set filetype=mustache: */}}

{{/*
Return the proper Ceramic image name
*/}}
{{- define "job.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.image "global" .Values.global) }}
{{- end -}}
