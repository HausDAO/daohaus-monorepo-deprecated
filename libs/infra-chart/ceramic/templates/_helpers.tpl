{{/* vim: set filetype=mustache: */}}

{{/*
Return the proper Ceramic image name
*/}}
{{- define "ceramic.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.image "global" .Values.global) }}
{{- end -}}
{{/*
 Create the name of the service account to use
 */}}
{{- define "ceramic.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "common.names.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}
