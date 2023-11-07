# AuthRouter.ts
## POST /login - ログインを処理する
```json
// request
// body
{
    "email": string,
    "password": string
}

// response
// body

```

## POST /signup - サインアップを処理する
```json
{
    "email": string,
    "password": string,
}
```

# NoteRouter.ts
## POST / - 新しいノートを作成する
```json
{
    "title": string,
    "content": string,
    "tags": string[]
}
```

## GET / - すべてのノートを取得する

## GET /:noteId - 特定のIDを持つノートを取得する

## PUT /:noteId - 特定のIDを持つノートを更新する
```json
{
    "title": string,
    "content": string,
    "tags": string[]
}
```

## DELETE /:noteId - 特定のIDを持つノートを削除する

# TagRouter.ts
## POST / - 新しいタグを作成する
## GET / - すべてのタグを取得する
## GET /:tagId - 特定のIDを持つタグを取得する
## PUT /:tagId - 特定のIDを持つタグの名前を変更する
## DELETE /:tagId - 特定のIDを持つタグを削除する