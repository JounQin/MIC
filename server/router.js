import vm from 'vm'
import axios from 'axios'
import encoding from 'encoding'
import Router from 'koa-router'
import {Random} from 'mockjs'

const JSONP_CALLBACK = 'jsonpCallback'

const parseJsonp = ({data}, convert) =>
  vm.runInNewContext(`const ${JSONP_CALLBACK} = v => v; ${convert ? encoding.convert(data, 'utf8', 'gbk') : data}`)

const router = new Router({prefix: '/api'})
  .get('/fetch-user', async ctx => {
    const {cookies} = ctx
    const userId = cookies.get('userId')
    ctx.body = {
      userId,
      userName: userId && cookies.get('userName'),
      unreadMsg: userId && Random.boolean(),
      unreadQuotation: userId && Random.boolean()
    }
  })
  .get('/search-suggest', async ctx => {
    const {keyword} = ctx.query || ''
    const url = 'https://keywordsuggestions.made-in-china.com/suggest/getEnProdSuggest.do'
    ctx.body = keyword.trim() ? parseJsonp(await axios.get(url, {
      params: {
        count: 5,
        kind: 5,
        call: JSONP_CALLBACK,
        param: encodeURIComponent(keyword)
      }
    })).map(({word}) => word) : []
  })
  .get('/fetch-banners', ctx => {
    ctx.body = [{
      link: 'happy-children-s-day',
      img: '8f4j00dvsQYupaJDio'
    }, {
      link: 'new-star-products',
      img: '8f4j00DBvtbdgqbLVp'
    }, {
      link: 'green-furnishing',
      img: '8f4j00bCZaKpVMrDWn'
    }, {
      link: 'outdoor-vehicle',
      img: '8f4j00bMSEIzidZPhV'
    }]
  })
  .get('/fetch-recommendations', (function () {
    const imgPath = (type, index) => `https://www.micstatic.com/mt/img/business/${type}/${index}.jpg`
    return ctx => {
      const index = Random.pick(Random.range(1, 8))
      ctx.body = {
        mostPopular: imgPath('mostpopular', index),
        lowMoq: imgPath('lowmoq', index),
        mostCollect: imgPath('mostcollect', index),
        products: Random.shuffle([
          {
            link: 'Tube-Extrusion-Line-with-High-Speed-and-High-Accuracy-755721845',
            img: '43f34j00hjvTDmkSwJbV/Tube-Extrusion-Line-with-High-Speed-and-High-Accuracy',
            title: 'Tube Extrusion Line with High Speed and High Accuracy'
          }, {
            link: 'HDPE-Composite-Water-Pipe-Production-Line-767290765',
            img: '43f34j00ZOWQveVhEYkq/HDPE-Composite-Water-Pipe-Production-Line',
            title: 'HDPE Composite Water Pipe Production Line'
          }, {
            link: 'High-Quality-PVC-Pipe-Extrusion-Line-733897575',
            img: '43f34j00JSVawoOlwBbr/High-Quality-PVC-Pipe-Extrusion-Line',
            title: 'High Quality PVC Pipe Extrusion Line'
          }, {
            link: 'Pet-Bottles-Preform-Injection-Moulding-Machine-766239035',
            img: '43f34j00YJKtQoTdnIqm/Pet-Bottles-Preform-Injection-Moulding-Machine',
            title: 'Pet Bottles Preform Injection Moulding Machine'
          }, {
            link: 'Auto-Car-Charger-Mini-Jump-Starter-for-Car-Battery-776256655',
            img: '43f34j00KyiQuMcsyvkO/Auto-Car-Charger-Mini-Jump-Starter-for-Car-Battery',
            title: 'Auto Car Charger Mini Jump Starter for Car Battery'
          }, {
            link: 'Weichai-Parts-Water-Pump-12273212-699053242',
            img: '43f34j00BKFETZJlhQuG/Weichai-Parts-Water-Pump-12273212-',
            title: 'Weichai Parts Water Pump (12273212)'
          }, {
            link: 'Truck-Parts-Diamond-Deck-Span-Tread-Aluminum-Truck-Steps-769421465',
            img: '43f34j00ZFsEUamCEGcv/Truck-Parts-Diamond-Deck-Span-Tread-Aluminum-Truck-Steps',
            title: 'Truck Parts, Diamond Deck-Span Tread Aluminum Truck Steps'
          }, {
            link: 'Plastic-Auto-Part-Auto-Mold-Plastic-Auto-Part-759232245',
            img: '43f34j00nNGETDOrqQka/Plastic-Auto-Part-Auto-Mold-Plastic-Auto-Part',
            title: 'Plastic Auto Part Auto Mold / Plastic Auto Part'
          }, {
            link: 'PA6-Corrugated-Tube-for-Protect-Wires-738194025',
            img: '43f34j00YKltGAfasyoU/PA6-Corrugated-Tube-for-Protect-Wires',
            title: 'PA6 Corrugated Tube for Protect Wires'
          }, {
            link: 'PC-2-Color-Roundness-Lampshade-Extrusion-Line-744813365',
            img: '43f34j00UygTtQoETzkZ/PC-2-Color-Roundness-Lampshade-Extrusion-Line',
            title: 'PC 2-Color Roundness Lampshade Extrusion Line'
          }, {
            link: 'Mingde-PE-Three-Layer-Co-Extrusion-Blown-Film-Machine-771743185',
            img: '43f34j00DOGEFavtYuqy/Mingde-PE-Three-Layer-Co-Extrusion-Blown-Film-Machine',
            title: 'Mingde PE Three-Layer Co-Extrusion Blown Film Machine'
          }, {
            link: 'Plastic-Grinding-Milling-Granulator-661832895',
            img: '43f34j00ABdtbRFGMkqS/Plastic-Grinding-Milling-Granulator',
            title: 'Plastic Grinding Milling Granulator'
          }, {
            link: 'Horizantal-Choke-Coils-with-Base-Choke-Coils-776632905',
            img: '43f34j00gNAQyMCJkuoT/Horizantal-Choke-Coils-with-Base-Choke-Coils',
            title: 'Horizantal Choke Coils with Base/Choke Coils'
          }, {
            link: 'Replacement-Parts-0308834080-BPW-Brake-Disc-685374962',
            img: '43f34j00JKbtaUGRTfuI/Replacement-Parts-0308834080-BPW-Brake-Disc',
            title: 'Replacement-Parts-0308834080-BPW-Brake-Disc-685374962'
          }, {
            link: 'OEM-Cusomized-Rubber-Parts-Products-SWCPU-R-P029-699129202',
            img: '43f34j00YNRaLIvbsrkH/OEM-Cusomized-Rubber-Parts-Products-SWCPU-R-P029-',
            title: 'OEM Cusomized Rubber Parts/ Products (SWCPU-R-P029)'
          }, {
            link: 'LED-Display-Solution-for-Advertising-Media-LS-O-P20-702350275',
            img: '43f34j00FZKaUCnWkYcO/LED-Display-Solution-for-Advertising-Media-LS-O-P20-',
            title: 'LED Display Solution for Advertising Media (LS-O-P20)'
          }
        ]).slice(0, 8)
      }
    }
  })())

export default app => app.use(router.routes()).use(router.allowedMethods())
