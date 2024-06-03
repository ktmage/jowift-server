/* eslint-disable no-irregular-whitespace */
import path from 'path';
import express from 'express';
import Router from './routes';
import { PORT } from './config';
import { cors, session, auth, handleError } from './middleware';

// import { handleError } from './utility';

const app = express();

// JSON リクエストボディを解析するためのミドルウェア
app.use(express.json());

// 認証ミドルウェア
app.use(auth);

// CORS ミドルウェア
app.use(cors);

// セッションミドルウェア
app.use(session);

// /api 以下のエンドポイントをルーティング
app.use('/api', Router);

app.use(handleError);

// 静的ファイルの提供
app.use(express.static(path.join(path.resolve(__dirname, '../public'))));

// その他のリクエストは index.html にリダイレクト
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// サーバーの起動
app.listen(PORT, () => {
	console.log(`
                           g                           
                          #_                          
                         ^ JH@HH
                    @H@@'  WUUWWHMMH@H
                 @H@MSr   .uuuuuuuuZXHM@H
               @MHXHH0     XZZZZZZZZZZZZWM@
             @MHZZX@Kr     .4ZZZZZZZZZZZZZWM@
            @MyyyyyHH$       _TXyyyyyyyyyyyyM@
           @MyyyyyyyWy{           ?74yyyyyyyyH@
          @MVyyyVyyyVVVk,             ?4yyyVVVH@
         @HHVVVVVVVVVVVVffn..           (WVVVVWH@
         HMfffff(fffffffffpfppfk+..      .fffffH@
         @Npppp$ ,4pppppppppfppppppWa,    jppppW@
         HNpppp)   .7Wpppppppppppppppppa. (ppppWH
         @Mpppbh       ?TUbpbbbbbbbbbbbbW.dbbbbH@
         H@Hkkbkh.          _74HkkbbkkbbbHbbkbH@H
         NHMkkkkkk&.            .TkkkkkkkkkkkqHH
           @MqqqqqqqH+..           4qHqqqqqqqH@
           NHMHqqqqqqqqqmHa,.       HHMqqqqHHH
            NH@Hmqqqmmmmmmmgmn      dm@MmmH@H
              NH@HHgmgggggggggL    .HHHMH@HN
                NM@HMHggggggggH    JHH@H
                   NM@H@@@MHHHH   J@HMN
                        NNMMMMF .
                              _(
                             g
   `);
	if (process.env.NODE_ENV !== 'production') {
		console.log(`\n🚀 Server is running at:\n\nhttp://localhost:${PORT}\n`);
		console.log('>> Press CTRL+C to stop\n');
	}
});
