import { ServiceProto } from 'tsrpc-proto';
import { ReqAddCart, ResAddCart } from './PtlAddCart';
import { ReqAddGood, ResAddGood } from './PtlAddGood';
import { ReqAddMoney, ResAddMoney } from './PtlAddMoney';
import { ReqBuyGoods, ResBuyGoods } from './PtlBuyGoods';
import { ReqEditGood, ResEditGood } from './PtlEditGood';
import { ReqGetCart, ResGetCart } from './PtlGetCart';
import { ReqGetGoods, ResGetGoods } from './PtlGetGoods';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqSearchOrder, ResSearchOrder } from './PtlSearchOrder';

export interface ServiceType {
    api: {
        "AddCart": {
            req: ReqAddCart,
            res: ResAddCart
        },
        "AddGood": {
            req: ReqAddGood,
            res: ResAddGood
        },
        "AddMoney": {
            req: ReqAddMoney,
            res: ResAddMoney
        },
        "BuyGoods": {
            req: ReqBuyGoods,
            res: ResBuyGoods
        },
        "EditGood": {
            req: ReqEditGood,
            res: ResEditGood
        },
        "GetCart": {
            req: ReqGetCart,
            res: ResGetCart
        },
        "GetGoods": {
            req: ReqGetGoods,
            res: ResGetGoods
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "SearchOrder": {
            req: ReqSearchOrder,
            res: ResSearchOrder
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 10,
    "services": [
        {
            "id": 6,
            "name": "AddCart",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "AddGood",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "AddMoney",
            "type": "api",
            "conf": {}
        },
        {
            "id": 8,
            "name": "BuyGoods",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "EditGood",
            "type": "api",
            "conf": {}
        },
        {
            "id": 9,
            "name": "GetCart",
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
        },
        {
            "id": 10,
            "name": "SearchOrder",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlAddCart/ReqAddCart": {
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
                    "name": "userId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "goodId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 2,
                    "name": "goodNum",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "PtlAddCart/ResAddCart": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
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
        "PtlAddMoney/ReqAddMoney": {
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
                    "name": "userId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "addMoney",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlAddMoney/ResAddMoney": {
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
                    "name": "curMoney",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlBuyGoods/ReqBuyGoods": {
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
                    "name": "userId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "cart",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "goodId",
                                    "type": {
                                        "type": "Reference",
                                        "target": "?mongodb/ObjectId"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "goodNum",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "PtlBuyGoods/ResBuyGoods": {
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
                    "name": "curMoney",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlEditGood/ReqEditGood": {
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
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "Name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "Des",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "price",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "restNum",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlEditGood/ResEditGood": {
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
        "PtlGetCart/ReqGetCart": {
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
                    "name": "userId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "PtlGetCart/ResGetCart": {
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
                    "name": "cart",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "goodId",
                                    "type": {
                                        "type": "Reference",
                                        "target": "?mongodb/ObjectId"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "goodNum",
                                    "type": {
                                        "type": "Number"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
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
                    "id": 3,
                    "name": "useId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
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
                },
                {
                    "id": 4,
                    "name": "money",
                    "type": {
                        "type": "Number"
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
        },
        "PtlSearchOrder/ReqSearchOrder": {
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
                    "name": "userId",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "timeLimit",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "beginTime",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "endTime",
                                "type": {
                                    "type": "Number"
                                }
                            }
                        ]
                    },
                    "optional": true
                }
            ]
        },
        "PtlSearchOrder/ResSearchOrder": {
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
                    "name": "orders",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Any"
                        }
                    }
                }
            ]
        }
    }
};