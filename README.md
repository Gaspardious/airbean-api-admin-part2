# Airbean-API - Grupp 2

HOW TO START AND TEST THE PROJECT:

1. Go to your terminal and type: "git clone git@github.com:Gaspardious/airbean-api-admin-part2.git"
2. Open project in VS code. 
3. Type "npm install"
4. Type "npm run dev"

Follow Project endpoints below to test different endpoints. Use Insomnia/Postman to try this. 


## 1.

`Som användare vill jag kunna se alla kaffesorter som går att beställa så jag får en överblick vad jag kan beställa och välja mellan.`

#### GET - /info/menu

###### Response

```
[
    {
        "title": "Cortado",
        "desc": "En cortado med lika delar espresso och varm mjölk.",
        "price": 33,
        "_id": "0Gu3mPAbONk1hy4P"
    },
    {
        "title": "Flat White",
        "desc": "En platt vit med silkeslen mikroskum och stark espresso.",
        "price": 46,
        "_id": "3IBqddqDtbAtIi2E"
    },
    [...]
```

#################################################################################################
#################################################################################################
#################################################################################################


## 2.

`Som användare vill jag kunna lägga en kaffesort i en varukorg så jag kan beställa mer samt få en överblick vad jag lagt till.`

#### POST - /cart

###### Request

```
{
  "product": "6ymMjHWMpLGChmJ6", // Mandatory, productID. Checks menu.db if the product exist.
  "cartID": "", // Optional, new cart if empty, existing cart if it exists.
  "customerID": "", // Optional, guest if empty.
  "quantity": 1 // Optional, gets 1 if empty.
}
```

###### Response

```
{
    "customerID": "",
    "product": [
        {
            "title": "Mocha",
            "desc": "En söt mocha med choklad och espresso.",
            "price": 55,
            "_id": "6ymMjHWMpLGChmJ6",
            "quantity": 1
        }
    ],
    "_id": "yHYB6NvAuAXa3CW2",
    "instructions": "cartID would've been saved to session/cookie to be included in the next call"
}
```

#################################################################################################
#################################################################################################
#################################################################################################

### 3.

`Som användare vill jag kunna ta bort en kaffesort i min varukorg så jag kan ändra mig ifall jag la till något av misstag eller inte längre vill ha det jag la till.`

#### DELETE - /cart/item

###### Request

```
{
  "cartID": "vVu2PrXxomKcrtQt",
  "productID" : "SjwGh9EVaYWtIzs7"
}
```

##### Response

```
{
    "message": "Item deleted successfully"
}
```
#################################################################################################
#################################################################################################
#################################################################################################

## 4.

`Som användare vill jag kunna läsa mer om företaget och dess kaffe så jag för förståelse för hur det produceras och kan göra ett informerat val.`

#### GET - /info

##### Response

```
{
    "info": "AirBean levererar kaffe med hjälp av drönare direkt till din dörr via en smidig app. Vi kombinerar avancerad teknologi med en passion för kaffe för en unik och effektiv upplevelse. Våra eldrivna drönare är energieffektiva och minskar utsläppen jämfört med traditionella leveransfordon. Optimerade leveransrutter minskar dessutom onödiga flygningar. Vi erbjuder högkvalitativt kaffe från certifierade ekologiska och fair trade-odlare. Detta säkerställer en etisk produktion och en överlägsen smak i varje kopp. Välj AirBean för en hållbar och bekväm kaffeupplevelse med gott samvete."
}
```

#################################################################################################
#################################################################################################
#################################################################################################

## 5.

`Som användare vill jag se min varukorg så jag får en överblick vad jag beställt och den totala summan att betala.`

#### GET - /cart/:id

###### Response

```
{
    "customerID": "ehLEGwSC1FzobAHN",
    "product": [
        {
            "title": "Macchiato",
            "desc": "En macchiato med en skvätt mjölk.",
            "price": 30,
            "_id": "dy1JqGCeAYWaJqri",
            "quantity": 10
        },
        {
            "title": "Cappuccino",
            "desc": "En krämig cappuccino med skummad mjölk.",
            "price": 45,
            "_id": "nG7UZ7wTTM0wm64Q",
            "quantity": 4
        }
    ],
    "_id": "Acwd7ENmZXDGozIg",
    "price": 480
}
```

#################################################################################################
#################################################################################################
#################################################################################################

## 6.

`Som användare vill jag kunna lägga en beställning som antingen gäst eller inloggad användare och se när beställningen levereras så att jag får mitt kaffe och vet ungefär när det kommer.`

#### POST - /cart/order

##### Request

###### Guest

```
{
  "customerID": null,
  "cartID": "Acwd7ENmZXDGozIg",
  "guestInfo": {
    "email": "guest@example.com",
    "phone": "1234567890"
  }
}
```

###### User

```
{
  "customerID": "DzbWOAIZTDQUyoQB",
  "cartID": "Acwd7ENmZXDGozIg",
  "guestInfo": "null"
}
```

##### Response

```
{
    "message": "Order placed successfully",
    "order": {
        "customerID": "3CFuQELPvlVoLZfz",
        "cartID": "Acwd7ENmZXDGozIg",
        "cartProducts": [
            {
                "title": "Macchiato",
                "desc": "En macchiato med en skvätt mjölk.",
                "price": 30,
                "_id": "dy1JqGCeAYWaJqri",
                "quantity": 10
            },
            {
                "title": "Cappuccino",
                "desc": "En krämig cappuccino med skummad mjölk.",
                "price": 45,
                "_id": "nG7UZ7wTTM0wm64Q",
                "quantity": 4
            }
        ],
        "price": 480,
        "date": "2024-06-03 15:07:17",
        "estimatedDelivery": "2024-06-03 15:27:17",
        "_id": "si1ip4tQsAh8K3OL"
    }
}
```
#################################################################################################
#################################################################################################
#################################################################################################

## 7.

`Som användare vill jag att det ska finnas en navigering så jag kan enkelt navigera mellan de olika sidorna och hitta det jag söker.`

Hemsidan använder olika routes.

#################################################################################################
#################################################################################################
#################################################################################################


## 8.

`Som användare vill jag kunna skapa ett konto för att kunna spara mina ordrar på mitt konto så jag kan se min orderhistorik.`

#### POST - /customer/register

##### Request

```
{
    "username": "andreas",
    "password": "password",
    "email": "a@b.se",
    "phone": "0731234567"
}
```

##### Response

```
{
    "message": "User registered successfully",
    "user": {
        "username": "andreas",
        "email": "a@b.se",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "phone": "0731234567",
        "_id": "COwTqeN5KqmJB5wB"
    }
}
```

#################################################################################################
#################################################################################################
#################################################################################################

## 9.

`Som användare vill jag kunna logga in för att sedan kunna lägga mina ordrar som inloggad användare så dessa sparas till min orderhistorik.`

#### POST - /customer/login

##### Request

```
{
    "email": "a@b.se",
    "password": "andreas"
}
```

##### Response


```
{
    "message": "User registered successfully",
    "user": {
        "username": "andreas",
        "email": "a@b.se",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "phone": "0731234567",
        "_id": "COwTqeN5KqmJB5wB"
    }
}
```
`Se ordrar genom att lägga till customerID i slutet, exempelvis 111 eller 222`

#### GET - /orders/:id   

##### Response

```
{
    "order": [
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 11
        },
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 5555
        },
        {
            "customerID": "COwTqeN5KqmJB5wB",
            "date": "2024-05-30 18:50",
            "products": "kaffe",
            "quantity": 4,
            "pricePerUnit": 35,
            "_id": 11111
        }
    ]
}
```

#################################################################################################
#################################################################################################
#################################################################################################

## 10.

#### GET - /orders/confirmation/:id    (order-id)

##### Response

```
{
    "customerID": "kFgt740aCqbHJLbC",
    "cartID": "x3gCLt7e1PLXBelE",
    "cartProducts": [
        {
            "title": "Americano",
            "desc": "En espresso utspädd med varmt vatten.",
            "price": 35,
            "_id": "SjwGh9EVaYWtIzs7",
            "quantity": 2
        }
    ],
    "date": "2024-06-03 14:28:01",
    "estimatedDelivery": "2024-06-03 14:48:01",
    "_id": "G3sS0UTlMmYN5arH",
    "deliveryTime": "14:48"
}
```
#################################################################################################
#################################################################################################
#################################################################################################

## 11 - ADMIN register

#### POST - /admin/register

##### Request

{
  "username": "Elon",
	"email": "elon.musk@tesla.com",
	"password": "spacex"
}



##### Response

{
	"message": "User registered successfully",
	"user": {
		"username": "Elon",
		"password": "e78bdebae031095bebcfd3e8954e4b880796dcec73d2a7f4701f5dd62a11f7af",
		"email": "elon.musk@tesla.com",
		"_id": "p5xnfwAGksT4DgSj"
	}
}

#################################################################################################
#################################################################################################
#################################################################################################

## 12 - ADMIN login

#### POST - /admin/login

##### Request


{
  "username": "Elon",
	"password": "spacex"
}


##### Response

{
	"message": "Login successful",
	"user": {
		"username": "Elon",
		"password": "e78bdebae031095bebcfd3e8954e4b880796dcec73d2a7f4701f5dd62a11f7af",
		"email": "elon.musk@tesla.com",
		"_id": "p5xnfwAGksT4DgSj"
	}
}

#################################################################################################
#################################################################################################
#################################################################################################

## 13 - ADMIN See whole menu (need to be logged in!)

#### GET - /admin/menu/items

##### Response


[
	{
		"title": "Cortado",
		"desc": "En cortado med lika delar espresso och varm mjölk.",
		"price": 33,
		"_id": "0Gu3mPAbONk1hy4P"
	},
	{
		"title": "Gustav Adolfsbakelse",
		"price": 45,
		"desc": "Gustav Adolfsbakelse är en bakelse som äts till minnet av Gustav II Adolfs dödsdag den 6 november 1632",
		"creationDate": "2024-06-12 11:30:05",
		"_id": "1urlzhDgKUpD0EJH"
	},
	{
		"title": "Flat White",
		"desc": "En platt vit med silkeslen mikroskum och stark espresso.",
		"price": 46,
		"_id": "3IBqddqDtbAtIi2E"
	},
	{
		"title": "Mocha",
		"desc": "En söt mocha med choklad och espresso.",
		"price": 55,
		"_id": "6ymMjHWMpLGChmJ6"
	},
	{
		"title": "Espresso",
		"desc": "En stark och aromatisk enkel espresso.",
		"price": 25,
		"_id": "QnMf8p1P9ZF9Oerm"
	},
	{
		"title": "Americano",
		"desc": "En espresso utspädd med varmt vatten.",
		"price": 35,
		"_id": "SjwGh9EVaYWtIzs7"
	},
	{
		"title": "CAMPAIGN!",
		"items": [
			{
				"title": "Gustav Adolfsbakelse",
				"price": 45,
				"desc": "Gustav Adolfsbakelse är en bakelse som äts till minnet av Gustav II Adolfs dödsdag den 6 november 1632",
				"creationDate": "2024-06-12 11:30:05",
				"_id": "1urlzhDgKUpD0EJH"
			},
			{
				"title": "Bryggkaffe",
				"desc": "Bryggd på månadens bönor.",
				"price": 39,
				"_id": "XxbJYtuWvSY6xPu0"
			}
		],
		"totalPrice": 84,
		"_id": "UaaULf7Ezqscc050"
	},
	{
		"title": "Bryggkaffe",
		"desc": "Bryggd på månadens bönor.",
		"price": 39,
		"_id": "XxbJYtuWvSY6xPu0"
	},
	{
		"title": "Latte",
		"desc": "En len latte med perfekt balanserad mjölk och espresso.",
		"price": 49,
		"_id": "ZVjipnljyz05sa1O"
	},
	{
		"title": "Macchiato",
		"desc": "En macchiato med en skvätt mjölk.",
		"price": 30,
		"_id": "dy1JqGCeAYWaJqri"
	},
	{
		"title": "Cold Brew",
		"desc": "Kallbryggt kaffe för en uppfriskande smakupplevelse.",
		"price": 42,
		"_id": "lN2tmDgmhBl1Mc6k"
	},
	{
		"title": "Cappuccino",
		"desc": "En krämig cappuccino med skummad mjölk.",
		"price": 45,
		"_id": "nG7UZ7wTTM0wm64Q"
	}
]

#################################################################################################
#################################################################################################
#################################################################################################

## 14 - ADMIN Add new items to menu (need to be logged in!)

#### POST - /admin/menu/items

##### Request


{
	"title":"Gustav Adolfsbakelse",
 "desc":"Gustav Adolfsbakelse är en bakelse som äts till minnet av Gustav II Adolfs dödsdag den 6 november 1632",
 "price":45,
 "id":""
}


##### Response

{
	"product": "Added",
	"formatDate": "2024-06-12 16:14:24",
	"result": {
		"title": "Gustav Adolfsbakelse",
		"price": 45,
		"desc": "Gustav Adolfsbakelse är en bakelse som äts till minnet av Gustav II Adolfs dödsdag den 6 november 1632",
		"creationDate": "2024-06-12 16:14:24",
		"_id": "uhRJ1RoK25oAbNKP"
	}
}

#################################################################################################
#################################################################################################
#################################################################################################

## 15 - ADMIN Update items in menu (need to be logged in!)

#### PUT - /admin/menu/items

##### Request

{
    "product": "WqFostzp1ZzFNmyx",
    "title": "Elon Muskssbakelse",
    "price": 450,
    "desc": "A rocket-shaped cookie"
}



##### Response

{
	"product": "Menu item updated!"
}

#################################################################################################
#################################################################################################
#################################################################################################

## 16 - ADMIN Delete items in menu (need to be logged in!)

#### DELETE - /admin/menu/items

##### Request

{
	"title":"Gustav Adolfsbakelse"
}


##### Response

{
	"message": "Item removed",
	"deleteMenu": 1
}

#################################################################################################
#################################################################################################
#################################################################################################

## 17 - ADMIN Add products to a campaign (need to be logged in!)

#### POST - /admin/menu/addToCampaign

##### Request

{
  "items": ["WqFostzp1ZzFNmyx", "XxbJYtuWvSY6xPu0"]
}



##### Response

{
	"title": "CAMPAIGN",
	"items": [
		{
			"title": "Elon Muskssbakelse",
			"price": 450,
			"desc": "A rocket-shaped cookie",
			"creationDate": "2024-06-12 16:20:08",
			"_id": "WqFostzp1ZzFNmyx",
			"modifiedAt": "2024-06-12T14:21:47.544Z"
		},
		{
			"title": "Bryggkaffe",
			"desc": "Bryggd på månadens bönor.",
			"price": 39,
			"_id": "XxbJYtuWvSY6xPu0"
		}
	],
	"totalPrice": 489,
	"_id": "F0dATOpCYEBASHCu"
}