# 前提
## MVCをどうやって実現するか
- model ... prismaのschemaがこれにあたる
- view ... client側
- service ... ビジネスロジックを書く
- controller ... http周りの処理を書く

# 2023-11-01 03:43
## 今日やったこと
- mvcの見直し、serviceの役割を明確にした

## 次回やること
- tagの実装から...
- プロジェクトルートの設定をしたいから、tsconfig.jsonをあたりを弄ってみたい。

## 認証アーキテクチャ

client                      server
            ---登録情報--->  User作成、UID作成、紐づけ
Cookie格納   <---UID---      set-cookie uid response.


