import { ServiceProto } from 'tsrpc-proto';
import { ReqAddGood, ResAddGood } from './PtlAddGood';
import { ReqGetGoods, ResGetGoods } from './PtlGetGoods';
import { ReqLogin, ResLogin } from './PtlLogin';

export interface ServiceType {
    api: {
        "AddGood": {
            req: ReqAddGood,
            res: ResAddGood
        },
        "GetGoods": {
            req: ReqGetGoods,
            res: ResGetGoods
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 3,
            "name": "AddGood",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "GetGoods",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "Login",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlAddGood/ReqAddGood": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "Name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "Des",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "price",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "restNum",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "PtlAddGood/ResAddGood": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "PtlGetGoods/ReqGetGoods": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ]
        },
        "PtlGetGoods/ResGetGoods": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "data",
                    "type": {
                        "type": "Any"
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "pwd",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "type",
                    "type": {
                        "type": "Reference",
                        "target": "PtlLogin/USERTYPR"
                    }
                }
            ]
        },
        "PtlLogin/USERTYPR": {
            "type": "Enum",
            "members": [
                {
                    "id": 0,
                    "value": 0
                },
                {
                    "id": 1,
                    "value": 1
                }
            ]
        }
    }
};