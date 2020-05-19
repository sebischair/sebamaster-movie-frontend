import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

const JwtSecret = 'very secret secret';

let users = [
    {
        "_id": "89df0ee733c74ce68724c433",
        "username" : "user1",
        "password" : "$2a$08$NP/ZaRzUXLxL6.6JgYTGK.5iF8riGvMnCZ0/Ve/mJonWT1hSgF7EC"
    }
];

let movies = [
    {
        "_id": "56df0ee733c74ce68724c433",
        "id": "771405216",
        "title": "The Choice",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 109,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-02-05"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 7,
            "audience_rating": "Upright",
            "audience_score": 66
        },
        "synopsis": "When feisty medical student Gabby Holland moves in next door to perennial ladies' man Travis Shaw, it sends them both on a romantic journey neither ever dreamed possible. Travis has always believed a serious relationship with a woman would cramp his easygoing lifestyle, while Gabby is all set to settle down her long-term boyfriend-until an irresistible attraction between the unlikely couple upends both of their well-planned lives. After a whirlwind courtship, Gabby and Travis wed and build a family together, making every decision hand-in-hand until one of them is forced to make the most important choice of their life alone. A poignant and life-affirming celebration of love, marriage and family that explores the most heart-wrenching question of all: how far would you go to keep the hope of love alive?",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            "profile": "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            "detailed": "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            "original": "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Travis Parker"
                ],
                "id": "351527935",
                "name": "Benjamin Walker"
            },
            {
                "characters": [
                    "Liz"
                ],
                "id": "771435801",
                "name": "Noree Victoria"
            },
            {
                "characters": [
                    "Katie"
                ],
                "id": "771796214",
                "name": "Lou Lou Safran"
            },
            {
                "characters": [
                    "Jesse"
                ],
                "id": "771496784",
                "name": "Vance Griswold"
            },
            {
                "characters": [
                    "Alice Vandt"
                ],
                "id": "771687957",
                "name": "Marty Stonerock"
            }
        ],
        "alternate_ids": {
            "imdb": "3797868"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771405216.json",
            "alternate": "//www.rottentomatoes.com/m/the_choice/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771405216/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771405216/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771405216/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c434",
        "id": "771321699",
        "title": "Star Wars: Episode VII - The Force Awakens",
        "year": 2015,
        "mpaa_rating": "PG-13",
        "runtime": 136,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2015-12-18"
        },
        "ratings": {
            "critics_rating": "Certified Fresh",
            "critics_score": 92,
            "audience_rating": "Upright",
            "audience_score": 90
        },
        "synopsis": "The Star Wars saga continues with this seventh entry -- the first under the Walt Disney Co. umbrella. The film will act as the start of a new trilogy set after the events of Return of the Jedi. J.J. Abrams directs from a script by Michael Arndt. ~ Jeremy Wheeler, Rovi",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/6xF9PyshnlqT6g4OU9xVQFLnr9g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/33/11203306_ori.jpg",
            "profile": "http://resizing.flixster.com/6xF9PyshnlqT6g4OU9xVQFLnr9g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/33/11203306_ori.jpg",
            "detailed": "http://resizing.flixster.com/6xF9PyshnlqT6g4OU9xVQFLnr9g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/33/11203306_ori.jpg",
            "original": "http://resizing.flixster.com/6xF9PyshnlqT6g4OU9xVQFLnr9g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/33/11203306_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Han Solo"
                ],
                "id": "162661579",
                "name": "Harrison Ford"
            },
            {
                "characters": [
                    "Luke Skywalker"
                ],
                "id": "162665747",
                "name": "Mark Hamill"
            },
            {
                "characters": [
                    "Princess Leia"
                ],
                "id": "162663355",
                "name": "Carrie Fisher"
            },
            {
                "characters": [
                    "Chewbacca"
                ],
                "id": "425838884",
                "name": "Peter Mayhew"
            },
            {
                "characters": [
                    "R2-D2"
                ],
                "id": "418638213",
                "name": "Kenny Baker"
            }
        ],
        "alternate_ids": {
            "imdb": "2488496"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771321699.json",
            "alternate": "//www.rottentomatoes.com/m/star_wars_episode_vii_the_force_awakens/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771321699/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771321699/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771321699/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c435",
        "id": "771379020",
        "title": "The Revenant",
        "year": 2015,
        "mpaa_rating": "R",
        "runtime": 156,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2015-12-25"
        },
        "ratings": {
            "critics_rating": "Certified Fresh",
            "critics_score": 82,
            "audience_rating": "Upright",
            "audience_score": 86
        },
        "synopsis": "Inspired by true events, THE REVENANT is an immersive and visceral cinematic experience capturing one man's epic adventure of survival and the extraordinary power of the human spirit. In an expedition of the uncharted American wilderness, legendary explorer Hugh Glass (Leonardo DiCaprio) is brutally attacked by a bear and left for dead by members of his own hunting team. In a quest to survive, Glass endures unimaginable grief as well as the betrayal of his confidant John Fitzgerald (Tom Hardy). Guided by sheer will and the love of his family, Glass must navigate a vicious winter in a relentless pursuit to live and find redemption. THE REVENANT is directed and co-written by renowned filmmaker, Academy Award (R) winner Alejandro G. Inarritu (Birdman, Babel). (C) Fox",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/uvN0TdOZWOZwM6mMe903tVFVyHI=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/35/11203523_ori.jpg",
            "profile": "http://resizing.flixster.com/uvN0TdOZWOZwM6mMe903tVFVyHI=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/35/11203523_ori.jpg",
            "detailed": "http://resizing.flixster.com/uvN0TdOZWOZwM6mMe903tVFVyHI=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/35/11203523_ori.jpg",
            "original": "http://resizing.flixster.com/uvN0TdOZWOZwM6mMe903tVFVyHI=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/35/11203523_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Hugh Glass"
                ],
                "id": "162659161",
                "name": "Leonardo DiCaprio"
            },
            {
                "characters": [
                    "John Fitzgerald"
                ],
                "id": "391527059",
                "name": "Tom Hardy"
            },
            {
                "characters": [
                    "Andrew Henry"
                ],
                "id": "770702167",
                "name": "Domhnall Gleeson"
            },
            {
                "characters": [
                    "Jim Bridger"
                ],
                "id": "770791291",
                "name": "Will Poulter"
            },
            {
                "characters": [
                    "Hawk"
                ],
                "id": "771746382",
                "name": "Forrest Goodluck"
            }
        ],
        "alternate_ids": {
            "imdb": "1663202"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771379020.json",
            "alternate": "//www.rottentomatoes.com/m/the_revenant_2015/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771379020/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771379020/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771379020/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c436",
        "id": "770785949",
        "title": "Hail, Caesar!",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 105,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-02-05"
        },
        "ratings": {
            "critics_rating": "Certified Fresh",
            "critics_score": 80,
            "audience_rating": "Spilled",
            "audience_score": 47
        },
        "synopsis": "Four-time Oscar (R)-winning filmmakers Joel and Ethan Coen (No Country for Old Men, True Grit, Fargo) write and direct Hail, Caesar!, an all-star comedy set during the latter years of Hollywood's Golden Age. Starring Josh Brolin, George Clooney, Alden Ehrenreich, Ralph Fiennes, Jonah Hill, Scarlett Johansson, Frances McDormand, Tilda Swinton and Channing Tatum, Hail, Caesar! follows a single day in the life of a studio fixer who is presented with plenty of problems to fix.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/h73xD-UmR-kbrnfVupUerJdbeB8=/51x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/43/44/11434453_ori.jpg",
            "profile": "http://resizing.flixster.com/h73xD-UmR-kbrnfVupUerJdbeB8=/51x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/43/44/11434453_ori.jpg",
            "detailed": "http://resizing.flixster.com/h73xD-UmR-kbrnfVupUerJdbeB8=/51x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/43/44/11434453_ori.jpg",
            "original": "http://resizing.flixster.com/h73xD-UmR-kbrnfVupUerJdbeB8=/51x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/43/44/11434453_ori.jpg"
        },
        "actors": [
            {
                "id": "162654528",
                "name": "George Clooney"
            },
            {
                "id": "162654237",
                "name": "Josh Brolin"
            },
            {
                "characters": [
                    "Thora Thacker"
                ],
                "id": "162654047",
                "name": "Tilda Swinton"
            },
            {
                "characters": [
                    "Laurence Lorenz"
                ],
                "id": "162653681",
                "name": "Ralph Fiennes"
            },
            {
                "characters": [
                    "Joseph Silverman"
                ],
                "id": "326297850",
                "name": "Jonah Hill"
            }
        ],
        "alternate_ids": {
            "imdb": "0475290"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/770785949.json",
            "alternate": "//www.rottentomatoes.com/m/hail_caesar_2016/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/770785949/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/770785949/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/770785949/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c437",
        "id": "771376964",
        "title": "Ride Along 2",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 102,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-15"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 13,
            "audience_rating": "Spilled",
            "audience_score": 56
        },
        "synopsis": "Kevin Hart and Ice Cube lead the returning lineup of Ride Along 2, the sequel to the blockbuster action-comedy that gave us the year's most popular comedy duo. Joining Hart and Cube for the next chapter of the series are director Tim Story, as well as Cube's fellow producers-Will Packer, Matt Alvarez and Larry Brezner-who will produce alongside Cube.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/__cAxiEs39e7JLG6j_YuaPcWqxg=/54x72/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/13/11201313_ori.jpg",
            "profile": "http://resizing.flixster.com/__cAxiEs39e7JLG6j_YuaPcWqxg=/54x72/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/13/11201313_ori.jpg",
            "detailed": "http://resizing.flixster.com/__cAxiEs39e7JLG6j_YuaPcWqxg=/54x72/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/13/11201313_ori.jpg",
            "original": "http://resizing.flixster.com/__cAxiEs39e7JLG6j_YuaPcWqxg=/54x72/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/13/11201313_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "James Payton"
                ],
                "id": "162652332",
                "name": "Ice Cube"
            },
            {
                "characters": [
                    "Ben Barber"
                ],
                "id": "770671077",
                "name": "Kevin Hart"
            },
            {
                "id": "771078913",
                "name": "Tika Sumpter"
            },
            {
                "id": "770692484",
                "name": "Ken Jeong"
            },
            {
                "id": "770797421",
                "name": "Olivia Munn"
            }
        ],
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771376964.json",
            "alternate": "//www.rottentomatoes.com/m/ride_along_2/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771376964/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771376964/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771376964/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c438",
        "id": "771414396",
        "title": "The Boy",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 97,
        "release_dates": {
            "theater": "2016-01-22"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 29,
            "audience_rating": "Spilled",
            "audience_score": 46
        },
        "synopsis": "The Boy is a frightening thrill ride directed by William Brent Bell (The Devil Inside) starring Lauren Cohan (\"The Walking Dead\"). Greta (Cohan) is a young American woman who takes a job as a nanny in a remote English village, only to discover that the family's 8-year-old is a life-sized doll that the parents care for just like a real boy, as a way to cope with the death of their actual son 20 years prior. After violating a list of strict rules, a series of disturbing and inexplicable events bring Greta's worst nightmare to life, leading her to believe that the doll is actually alive.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/Kh_QIoCKWORpM2s9cnfaT1JnO8Y=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420910_ori.jpg",
            "profile": "http://resizing.flixster.com/Kh_QIoCKWORpM2s9cnfaT1JnO8Y=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420910_ori.jpg",
            "detailed": "http://resizing.flixster.com/Kh_QIoCKWORpM2s9cnfaT1JnO8Y=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420910_ori.jpg",
            "original": "http://resizing.flixster.com/Kh_QIoCKWORpM2s9cnfaT1JnO8Y=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420910_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Greta"
                ],
                "id": "723599362",
                "name": "Lauren Cohan"
            },
            {
                "characters": [
                    "Malcolm"
                ],
                "id": "770721594",
                "name": "Rupert Evans"
            },
            {
                "characters": [
                    "Mr. Heelshire"
                ],
                "id": "364618732",
                "name": "Jim Norton"
            },
            {
                "characters": [
                    "Mrs. Heelshire"
                ],
                "id": "364643881",
                "name": "Diana Hardcastle"
            },
            {
                "characters": [
                    "Cole"
                ],
                "id": "771746369",
                "name": "Ben Robson"
            }
        ],
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771414396.json",
            "alternate": "//www.rottentomatoes.com/m/the_boy/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771414396/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771414396/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771414396/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c439",
        "id": "771388387",
        "title": "Dirty Grandpa",
        "year": 2016,
        "mpaa_rating": "R",
        "runtime": 102,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-22"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 9,
            "audience_rating": "Spilled",
            "audience_score": 51
        },
        "synopsis": "Jason Kelly [Zac Efron] is one week away from marrying his boss's uber-controlling daughter, putting him on the fast track for a partnership at the law firm. However, when the straight-laced Jason is tricked into driving his foul-mouthed grandfather, Dick [Robert De Niro], to Daytona for spring break, his pending nuptials are suddenly in jeopardy. Between riotous frat parties, bar fights, and an epic night of karaoke, Dick is on a quest to live his life to the fullest and bring Jason along for the ride. Ultimately, on the wildest journey of their lives, \"dirty\" Grandpa and his uptight grandson discover they can learn from one another and form the bond they never had.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/WemazPxTiHozPo_QRpPP3fKFvMk=/53x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353466_ori.jpg",
            "profile": "http://resizing.flixster.com/WemazPxTiHozPo_QRpPP3fKFvMk=/53x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353466_ori.jpg",
            "detailed": "http://resizing.flixster.com/WemazPxTiHozPo_QRpPP3fKFvMk=/53x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353466_ori.jpg",
            "original": "http://resizing.flixster.com/WemazPxTiHozPo_QRpPP3fKFvMk=/53x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353466_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Dick Kelly"
                ],
                "id": "162655521",
                "name": "Robert De Niro"
            },
            {
                "characters": [
                    "Jason Kelly"
                ],
                "id": "171852647",
                "name": "Zac Efron"
            },
            {
                "characters": [
                    "Meredith Goldstein"
                ],
                "id": "770848071",
                "name": "Julianne Hough"
            },
            {
                "characters": [
                    "Lenore"
                ],
                "id": "770826846",
                "name": "Aubrey Plaza"
            },
            {
                "characters": [
                    "Shadia"
                ],
                "id": "771102778",
                "name": "Zoey Deutch"
            }
        ],
        "alternate_ids": {
            "imdb": "1860213"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771388387.json",
            "alternate": "//www.rottentomatoes.com/m/dirty_grandpa/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771388387/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771388387/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771388387/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43a",
        "id": "771357524",
        "title": "The Finest Hours",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 117,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-29"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 58,
            "audience_rating": "Upright",
            "audience_score": 72
        },
        "synopsis": "Casey Sherman and Michael J. Tougias' book detailing a daring 1952 Coast Guard rescue off the New England seaboard comes to the screen in this Disney film produced by Jim Whitaker (Take Me Home Tonight, The Odd Life of Timothy Green). James Tamasy and Eric Johnson team to pen the screenplay. ~ Jason Buchanan, Rovi",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/0pzFt97u3wobm5sINqAzDjbq12M=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/48/82/11488235_ori.jpg",
            "profile": "http://resizing.flixster.com/0pzFt97u3wobm5sINqAzDjbq12M=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/48/82/11488235_ori.jpg",
            "detailed": "http://resizing.flixster.com/0pzFt97u3wobm5sINqAzDjbq12M=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/48/82/11488235_ori.jpg",
            "original": "http://resizing.flixster.com/0pzFt97u3wobm5sINqAzDjbq12M=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/48/82/11488235_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Bernie Webber"
                ],
                "id": "326393041",
                "name": "Chris Pine"
            },
            {
                "characters": [
                    "Ray Sybert"
                ],
                "id": "162706324",
                "name": "Casey Affleck"
            },
            {
                "characters": [
                    "Richard Livesey"
                ],
                "id": "162669838",
                "name": "Ben Foster"
            },
            {
                "characters": [
                    "Daniel Cluff"
                ],
                "id": "162662190",
                "name": "Eric Bana"
            },
            {
                "characters": [
                    "Tchuda Southerland"
                ],
                "id": "770689252",
                "name": "Josh Stewart"
            }
        ],
        "alternate_ids": {
            "imdb": "2025690"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771357524.json",
            "alternate": "//www.rottentomatoes.com/m/the_finest_hours/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771357524/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771357524/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771357524/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43b",
        "id": "771385239",
        "title": "The 5th Wave",
        "year": 2016,
        "mpaa_rating": "PG-13",
        "runtime": 112,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-22"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 17,
            "audience_rating": "Spilled",
            "audience_score": 48
        },
        "synopsis": "16-year-old Cassie Sullivan tries to survive in a world devastated by the waves of an alien invasion that has already decimated the population and knocked mankind back to the Stone Age.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/2OlomN6HSovs5aLAyez0EdMsWwE=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420916_ori.jpg",
            "profile": "http://resizing.flixster.com/2OlomN6HSovs5aLAyez0EdMsWwE=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420916_ori.jpg",
            "detailed": "http://resizing.flixster.com/2OlomN6HSovs5aLAyez0EdMsWwE=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420916_ori.jpg",
            "original": "http://resizing.flixster.com/2OlomN6HSovs5aLAyez0EdMsWwE=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420916_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Ringer"
                ],
                "id": "771420019",
                "name": "Maika Monroe"
            },
            {
                "characters": [
                    "Colonel Vosch"
                ],
                "id": "162653994",
                "name": "Liev Schreiber"
            },
            {
                "characters": [
                    "Cassie Sullivan"
                ],
                "id": "771410621",
                "name": "Chloe Grace Moretz"
            },
            {
                "characters": [
                    "Ben Parish/Zombie"
                ],
                "id": "519530763",
                "name": "Nick Robinson"
            },
            {
                "characters": [
                    "Sergeant Reznik"
                ],
                "id": "162654542",
                "name": "Maria Bello"
            }
        ],
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771385239.json",
            "alternate": "//www.rottentomatoes.com/m/the_fifth_wave/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771385239/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771385239/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771385239/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43c",
        "id": "771421437",
        "title": "13 Hours: The Secret Soldiers Of Benghazi",
        "year": 2016,
        "mpaa_rating": "R",
        "runtime": 144,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-15"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 54,
            "audience_rating": "Upright",
            "audience_score": 87
        },
        "synopsis": "Based on the book 13 Hours: The Inside Account of What Really Happened in Benghazi.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/uKqObrUM5lxw7CA9pxud294cDbQ=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420915_ori.jpg",
            "profile": "http://resizing.flixster.com/uKqObrUM5lxw7CA9pxud294cDbQ=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420915_ori.jpg",
            "detailed": "http://resizing.flixster.com/uKqObrUM5lxw7CA9pxud294cDbQ=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420915_ori.jpg",
            "original": "http://resizing.flixster.com/uKqObrUM5lxw7CA9pxud294cDbQ=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/42/09/11420915_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Jack"
                ],
                "id": "625475404",
                "name": "John Krasinski"
            },
            {
                "characters": [
                    "Rone"
                ],
                "id": "359854267",
                "name": "James Badge Dale"
            },
            {
                "characters": [
                    "Tanto"
                ],
                "id": "162654181",
                "name": "Pablo Schreiber"
            },
            {
                "characters": [
                    "Oz"
                ],
                "id": "770679954",
                "name": "Max Martini"
            },
            {
                "characters": [
                    "Glen 'Bub' Doherty"
                ],
                "id": "326396405",
                "name": "Toby Stephens"
            }
        ],
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771421437.json",
            "alternate": "//www.rottentomatoes.com/m/13_hours_the_secret_soldiers_of_benghazi/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771421437/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771421437/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771421437/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43d",
        "id": "771377488",
        "title": "The Big Short",
        "year": 2015,
        "mpaa_rating": "R",
        "runtime": 130,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2015-12-23"
        },
        "ratings": {
            "critics_rating": "Certified Fresh",
            "critics_score": 88,
            "audience_rating": "Upright",
            "audience_score": 89
        },
        "synopsis": "Writer/director Adam McKay joins forces with Paramount Pictures and Plan B Entertainment to adapt Michael Lewis' best-seller The Big Short: Inside the Doomsday Machine, which centers on the housing a credit bubble of the 2000s. ~ Jason Buchanan, Rovi",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/UQnw5x1s6G1JaNZi0lcjh58WLxY=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207068_ori.jpg",
            "profile": "http://resizing.flixster.com/UQnw5x1s6G1JaNZi0lcjh58WLxY=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207068_ori.jpg",
            "detailed": "http://resizing.flixster.com/UQnw5x1s6G1JaNZi0lcjh58WLxY=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207068_ori.jpg",
            "original": "http://resizing.flixster.com/UQnw5x1s6G1JaNZi0lcjh58WLxY=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207068_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Michael Burry"
                ],
                "id": "162652645",
                "name": "Christian Bale"
            },
            {
                "characters": [
                    "Mark Baum"
                ],
                "id": "162652665",
                "name": "Steve Carell"
            },
            {
                "characters": [
                    "Jared Vennett"
                ],
                "id": "162654751",
                "name": "Ryan Gosling"
            },
            {
                "characters": [
                    "Ben Rickert"
                ],
                "id": "162652627",
                "name": "Brad Pitt"
            },
            {
                "characters": [
                    "Evie"
                ],
                "id": "770875036",
                "name": "Karen Gillan"
            }
        ],
        "alternate_ids": {
            "imdb": "3622082"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771377488.json",
            "alternate": "//www.rottentomatoes.com/m/the_big_short/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771377488/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771377488/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771377488/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43e",
        "id": "771371542",
        "title": "Daddy's Home",
        "year": 2015,
        "mpaa_rating": "PG-13",
        "runtime": 96,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2015-12-25"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 31,
            "audience_rating": "Spilled",
            "audience_score": 58
        },
        "synopsis": "An affable radio executive finds himself competing for the affections of his step-children following the unexpected reappearance of his wife's ex-husband in this Paramount Pictures comedy. ~ Jason Buchanan, Rovi",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/iitHdC6r9E9HNfs4sldZBrL_j7o=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/34/44/11344427_ori.jpg",
            "profile": "http://resizing.flixster.com/iitHdC6r9E9HNfs4sldZBrL_j7o=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/34/44/11344427_ori.jpg",
            "detailed": "http://resizing.flixster.com/iitHdC6r9E9HNfs4sldZBrL_j7o=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/34/44/11344427_ori.jpg",
            "original": "http://resizing.flixster.com/iitHdC6r9E9HNfs4sldZBrL_j7o=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/34/44/11344427_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Brad"
                ],
                "id": "162652185",
                "name": "Will Ferrell"
            },
            {
                "characters": [
                    "Dusty"
                ],
                "id": "162653181",
                "name": "Mark Wahlberg"
            },
            {
                "characters": [
                    "Sarah"
                ],
                "id": "162667559",
                "name": "Linda Cardellini"
            },
            {
                "characters": [
                    "Leo"
                ],
                "id": "162683650",
                "name": "Thomas Haden Church"
            },
            {
                "characters": [
                    "Griff"
                ],
                "id": "771078420",
                "name": "Hannibal Buress"
            }
        ],
        "alternate_ids": {
            "imdb": "1528854"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771371542.json",
            "alternate": "//www.rottentomatoes.com/m/daddys_home_2014/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771371542/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771371542/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771371542/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c43f",
        "id": "771420177",
        "title": "Fifty Shades of Black",
        "year": 2016,
        "mpaa_rating": "R",
        "runtime": 93,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2016-01-29"
        },
        "ratings": {
            "critics_rating": "Rotten",
            "critics_score": 7,
            "audience_rating": "Spilled",
            "audience_score": 24
        },
        "synopsis": "This spoof from the Wayans Brothers parodies the ultra-popular novel/film series Fifty Shades of Grey.",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/pH9-IBJw0fdzz-n9Kv9jCW4yp4g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353467_ori.jpg",
            "profile": "http://resizing.flixster.com/pH9-IBJw0fdzz-n9Kv9jCW4yp4g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353467_ori.jpg",
            "detailed": "http://resizing.flixster.com/pH9-IBJw0fdzz-n9Kv9jCW4yp4g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353467_ori.jpg",
            "original": "http://resizing.flixster.com/pH9-IBJw0fdzz-n9Kv9jCW4yp4g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/35/34/11353467_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Christian Black"
                ],
                "id": "162682781",
                "name": "Marlon Wayans"
            },
            {
                "characters": [
                    "Hannah"
                ],
                "id": "770763154",
                "name": "Kali Hawk"
            },
            {
                "characters": [
                    "Ron"
                ],
                "id": "162654099",
                "name": "Mike Epps"
            },
            {
                "characters": [
                    "Jesse"
                ],
                "id": "771638663",
                "name": "Andrew Bachelor"
            },
            {
                "characters": [
                    "Eli"
                ],
                "id": "770671599",
                "name": "Affion Crockett"
            }
        ],
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771420177.json",
            "alternate": "//www.rottentomatoes.com/m/fifty_shades_of_black/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771420177/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771420177/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771420177/similar.json"
        }
    },
    {
        "_id": "56df0ee733c74ce68724c440",
        "id": "771306093",
        "title": "The Good Dinosaur",
        "year": 2015,
        "mpaa_rating": "PG",
        "runtime": 100,
        "critics_consensus": "",
        "release_dates": {
            "theater": "2015-11-25",
            "dvd": "2016-02-23"
        },
        "ratings": {
            "critics_rating": "Certified Fresh",
            "critics_score": 77,
            "audience_rating": "Upright",
            "audience_score": 69
        },
        "synopsis": "\"The Good Dinosaur\" asks the question: What if the asteroid that forever changed life on Earth missed the planet completely and giant dinosaurs never became extinct? Pixar Animation Studios takes you on an epic journey into the world of dinosaurs where an Apatosaurus named Arlo makes an unlikely human friend. While traveling through a harsh and mysterious landscape, Arlo learns the power of confronting his fears and discovers what he is truly capable of. (C) Disney",
        "posters": {
            "thumbnail": "http://resizing.flixster.com/QPxjgHkOs9puYxQDL5P-WA65ONc=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207072_ori.jpg",
            "profile": "http://resizing.flixster.com/QPxjgHkOs9puYxQDL5P-WA65ONc=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207072_ori.jpg",
            "detailed": "http://resizing.flixster.com/QPxjgHkOs9puYxQDL5P-WA65ONc=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207072_ori.jpg",
            "original": "http://resizing.flixster.com/QPxjgHkOs9puYxQDL5P-WA65ONc=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/70/11207072_ori.jpg"
        },
        "actors": [
            {
                "characters": [
                    "Arlo"
                ],
                "id": "770829316",
                "name": "Raymond Ochoa"
            },
            {
                "characters": [
                    "Poppa"
                ],
                "id": "162653065",
                "name": "Jeffrey Wright"
            },
            {
                "characters": [
                    "Momma"
                ],
                "id": "162654734",
                "name": "Frances McDormand"
            },
            {
                "characters": [
                    "Thunderclap"
                ],
                "id": "162652352",
                "name": "Steve Zahn"
            },
            {
                "characters": [
                    "Nash"
                ],
                "id": "326392926",
                "name": "A.J. Buckley"
            }
        ],
        "alternate_ids": {
            "imdb": "1979388"
        },
        "links": {
            "self": "//api.rottentomatoes.com/api/public/v1.0/movies/771306093.json",
            "alternate": "//www.rottentomatoes.com/m/the_good_dinosaur/",
            "cast": "//api.rottentomatoes.com/api/public/v1.0/movies/771306093/cast.json",
            "reviews": "//api.rottentomatoes.com/api/public/v1.0/movies/771306093/reviews.json",
            "similar": "//api.rottentomatoes.com/api/public/v1.0/movies/771306093/similar.json"
        }
    },
    {
        "_id": "56e05e59bce287981f6aad8b",
        "year": 2016,
        "description": "test",
        "titel": "test",
        "__v": 0
    },
    {
        "_id": "56e060f914ac0bec26497bc6",
        "year": 2016,
        "description": "test",
        "titel": "test",
        "__v": 0
    }
];

export default class MoviesAPISimulator {

    constructor(){

    }

    static getMoviesAsync () {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){
                let response = { data: movies.map((movie) => { return {id: movie.id, title: movie.title}}) };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };


    static getMovieByIdAsync (id) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let movie = {};
                let movieIndex = movies.map(movie => movie['id']).indexOf(id);
                if (movieIndex > -1) movie = movies[movieIndex];

                let response = { data: Object.assign({},movie)};
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };

    static createMovie (movie, token) {
        if(MoviesAPISimulator.isAuthenticated(token)) {
            return new Promise((resolve, reject) => {
                // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
                // In this example, we use setTimeout(...) to simulate async code.
                // In reality, you will probably be using something like XHR or an HTML5 API.
                setTimeout(function(){

                    let _movie  = Object.assign({},movie, {'_id': ObjectId()});
                    movies.push(_movie);

                    let response = _movie;
                    resolve(response); // Yay! Everything went well!
                }, 250);
            });
        }
        else {
            window.location = '/#login';
            return Promise.reject('not authorized');
        }
    };

    static deleteMovie (id, token) {
        if(MoviesAPISimulator.isAuthenticated(token)) {
            return new Promise((resolve, reject) => {
                // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
                // In this example, we use setTimeout(...) to simulate async code.
                // In reality, you will probably be using something like XHR or an HTML5 API.
                setTimeout(function(){

                    let movieIndex = movies.map(movie => movie['id']).indexOf(id);
                    movies.splice(movieIndex,1); //Mutation


                    let response = { status: 200, message: 'Movie deleted' };
                    resolve(response); // Yay! Everything went well!
                }, 250);
            });
        }
        else {
            window.location = '/#login';
            return Promise.reject('not authorized');
        }
    };

    static updateMovie (movie, token) {
        if(MoviesAPISimulator.isAuthenticated(token)) {
            return new Promise((resolve, reject) => {
                // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
                // In this example, we use setTimeout(...) to simulate async code.
                // In reality, you will probably be using something like XHR or an HTML5 API.
                setTimeout(function(){

                    let movieIndex = movies.map(_movie => _movie['id']).indexOf(movie['id']);
                    movies[movieIndex] =  Object.assign({},movies[movieIndex], movie);

                    let response = movies[movieIndex];
                    resolve(response); // Yay! Everything went well!
                }, 250);
            });
        }
        else {
            window.location = '/#login';
            return Promise.reject('not authorized');
        }
    };

    static login(username, password) {
        return new Promise((resolve, reject) => {
           setTimeout(function() {
               let user = {};
               let userIndex = users.map(user => user['username']).indexOf(username);
               if (userIndex == -1) {
                   reject('Invalid credentials');
               }
               else {
                   user = users[userIndex];
                   const isPasswordValid = bcrypt.compareSync(password, user.password);
                   if(!isPasswordValid) {
                       reject('Invalid credentials');
                   }
                   let token = jwt.sign({ id: user._id, username: user.username }, JwtSecret, {
                       expiresIn: 86400 // expires in 24 hours
                   });
                   let response = { token: token};
                   resolve(response); // Yay! Everything went well!
               }
           }, 250);
        });
    }

    static register(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if(username == undefined || password == undefined) {
                    reject('Bad request');
                }
                else {
                    const user = {
                        '_id': ObjectId(),
                        'username' : username,
                        'password' : bcrypt.hashSync(password, 8)
                    };

                    users.push(user);
                    let token = jwt.sign({ id: user._id, username: user.username }, JwtSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    let response = {
                        token: token
                    };
                    resolve(response); // Yay! Everything went well!
                }
            }, 250);
        });
    }

    static isAuthenticated(token) {
        if (!token) {
            return false;
        }

        // verifies secret and checks exp
        try {
            var decoded = jwt.verify(token, JwtSecret);
            if(decoded != undefined) {
                return true;
            }
            return false;
        }
        catch(err) {
            return false;
        }
    };
}