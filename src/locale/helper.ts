import {kz} from "./kz"
import {ru} from "./ru"
import {en} from "./en"

export default function t(ll: string){


    if( ll === "kz"){
        return kz
    }else if( ll === "en"){
        return en
    }else {
        return ru
    }
}

