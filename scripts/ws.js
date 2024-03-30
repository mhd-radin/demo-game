const ws = {
  PATH_SCRIPT: '/scripts/',
  PATH_CLASSES: '/scripts/classes/',
  PATH_PAGES: '/scripts/pages/',
  PATH_ASSET_IMAGES: '/assets/sources/',
  STORE_CLASSIC_ENTITY: app.classicStore,
  SCRIPT_HOME_PAGE: null,
  SCRIPT_GAME_PAGE: null,
  SCRIPT_ROOM_PAGE: null,
  UPDATE_APP: app.update,
  APP: app,
  CTX: ctx,
  VERSION: '1.0',
  EVENT_ON_FILE_LOADS,
  EVENT_ON_FILE_LOAD_FINSHED,
  ASSETS: {
    vehicles: {
      skiber: {
        idle: {
          path: '/assets/sources/vehicles/skiber/Idle.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 1,
          df: 80,
        },
        move: {
          path: '/assets/sources/vehicles/skiber/Move.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 6,
          df: 80,
        },
        boost: {
          path: '/assets/sources/vehicles/skiber/Boost.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 6,
          df: 80,
        },
        destroy: {
          path: '/assets/sources/vehicles/skiber/Destroyed.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 10,
          df: 80
        }
      },
      woober: {
        idle: {
          path: '/assets/sources/vehicles/woober/Idle.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 1,
          df: 80,
        },
        move: {
          path: '/assets/sources/vehicles/woober/Move.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 6,
          df: 80,
        },
        boost: {
          path: '/assets/sources/vehicles/woober/Boost.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 5,
          df: 80,
        },
        destroy: {
          path: '/assets/sources/vehicles/woober/Destroyed.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 15,
          df: 80
        }
      },
      fighter: {
        idle: {
          path: '/assets/sources/vehicles/fighter/Idle.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 1,
          df: 80,
        },
        move: {
          path: '/assets/sources/vehicles/fighter/Move.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 6,
          df: 80,
        },
        boost: {
          path: '/assets/sources/vehicles/fighter/Boost.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 5,
          df: 80,
        },
        destroy: {
          path: '/assets/sources/vehicles/fighter/Destroyed.png',
          x: 0,
          y: 0,
          w: 192,
          h: 192,
          frames: 21,
          df: 80
        }
      }
    }
  }
}