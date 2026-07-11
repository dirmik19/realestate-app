# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

不動産アプリ（realestate-app）。プロジェクトはまだ初期段階です。技術スタックやアーキテクチャが固まり次第、このファイルに追記してください。

## Git運用ルール

- **コードに変更を加えるたびに、GitHubへプッシュすること。** 変更を溜め込まず、意味のある単位（1機能・1修正など）でコミットし、都度リモートへプッシュする。
- コミット前に `git status` / `git diff` で変更内容を確認する。
- コミットメッセージは変更内容が分かるように簡潔に書く（日本語・英語どちらでも可）。
- 破壊的な操作（`git push --force`、`git reset --hard` など）は必ず事前にユーザーに確認する。
- 機密情報（APIキー、パスワード、トークンなど）を含むファイルはコミットしない。
