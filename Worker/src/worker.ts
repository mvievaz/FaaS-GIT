import * as python from './progLang/python'
import * as typeScript from './progLang/nodeJS'
import * as gitUtils from './git-utils'

var gitURL: string = "https://github.com/mvievaz/PI-Test-for-FaaS.git"

gitUtils.downloadGIT(gitURL)
// ToDo