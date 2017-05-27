import {NO_IMAGE} from 'utils'

export const imgPath = (path, defaultImg = NO_IMAGE) =>
  path ? /^(https?:\/|data:image)\//ig.test(path) ? path : IMG_PATH_PREFIX + path : defaultImg
