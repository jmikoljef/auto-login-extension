const IMG_VAL = {
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAADqUlEQVRIicWXTW/TWBSGWcTn5hcgIYRYwj8Y/gFBGqCdfDlxEjsfZMSC1QipSmFGoqsRFaymNEn9GTvELYvJDokiNIspHY2q6YJlhbosmwqpC6iq6p3FDb4OskNmJIKlR3HuPed9riP7yjlz5lsfxyenuO9t42LdQmL+t6/GxbqF+942jk9OEchbvddI/LAyM1q910J+rmYhkVmdGedqlpBLuQ5mjZDLOmZNICfFxH+maAj+R7+QVxx8kbI9wgKVTI5iiPOyJWqmyAvkTHMxEbUHpjpgFRusZIIpBlhxTaAYfLxi8zq1NzlPc0Pyah+xaB6Y6oJVHLCSCSrqoEIHlF8VFDqgoj5agMPrNS8+s9oPyesDxFLr89VWbJCig+Q2riyso+VuoeX+iZa7hSsL6yC5DVJ0fvWay/sm5Ap5w0ckn+SqAyoZILmN7os3iDq6L97wBZQM/tN/ksdkB/Jkcx2R3PKRrPfBVBtM6WLR2wpkO3sHaNl/YGfvIBhb9LbAlC6YaiNZ7/P+mOyQfAOR3PKRrHlgZROs0Mbbg/eB6FKzA7rxEJeanWDs7cF7sEIbrGwiWfNG8uhsIf/xGSIJ5AYu3/HGJHRzOSC8qMt3eH0gj8meSs6qLlhJx7WlYSB4ubsPmn8U8HJ3P5i7tjQEK+lgVXdKefMZImn4/M5VdKQefCafewSaewyaG5enHgzBFB1Mc5Fs+NG5zZCcNTcQSWMApvVAyhpSoSvf3N2HdHM5YDMsXxqClDUwrcf7Y7LF9trYQCQ1H6S6kIo6zmp6IDg8+oDE9YcBh0cfgrmzmg6pqINUl/fHZAt5fR2R1AZcrpiQcqvY2XsXSK7e85H4/ldcveeHHr93kHKrkBRzJB9E59ZDjxpVfUSiDUAVD6RYkPJdyMvPxzaWzX/2x77Ly88h5bsgxeJ92iA6txraZEgdIJLKU1DZAykOSDYgZdq4/eQVDo8+jkkPjz7i9pNXkDJtSLLB68se74/JFvLyU8RS6oOKPZBsgXI6F8yv4LuffKR+/h2pX4aQ5lcgZdqgnM7rij3eNyE39DLhIZaiO5LboLwJyuqQMh1I6bYg0wFldT4v27y+6MZnKl5IXnAxEbkHkh1Q3gblLFDW4GR0cZ6z+Lzs8PovZAp53sFU5OwRFihrgbIm/8xZYm7KLCHPWJg1Qp42MGsC+fmqB0rrM+N8NXTDLbp/g9JrM2PB+UvIj09OcdfaxoW6C0p3vxoX6i7uWp/9UfxWx7/WS2YMqgoHaQAAAABJRU5ErkJggg==" : 0,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAADI0lEQVRIicWXzY7TVhiGWYy/kztACCFuZ9gxJHEcx3ac2BOuAAmlolULcwXMDD+J4+O/2EkG1AJLummrMlV37Z4VC7YsR6PRy+J4cgwam7DAfNKzsM857/PZOrbsS5e+d52cnuFecozrDsfWzsE347rDcS85xsnpGdbycfQGW7cOa2McvZHyK0OOrdbj2rgy5FKuqE9RN1KueaibtZx6PupGyq0QG2MGBXhOfvwVOWs5s2NsRD8Cs0Iwk+f4OVyc70eb5dhxQT6YoxI7kXKTgxk+SPdA+hTU88AMH8wKcnlSnZUj5U6GSoYp2CAB64cgwwfpE1x2OLYfvMT23itcHsVgFhcNDufVWTlS7i5QiZPLrUBcbecRxvHfOK/tvVcgwwezI9Hol/LchZQ3RkuUsrtAw83QGCZgfY7f/3+Ht+8/oFg39l6AGR6YHaLhpuVZBQryFUrZXaLhLoTc4riobtz/Daw3zeVZeVYBKb99hFJGK9Gtk4LZIZg+AbX3MQ7/lLd9LY+kvCrz9tGG8vMG3AxsEAmJeoBxVJD/csGVbywfHaGS3RUa7kLs5p4Hph5iHP5VkP8K1p2AWQEaw1TM/0Km3O2jFSrZXYK5GZgdgXpTkHrw6W3/+TlIewQyZ+KpcBdiTUWmfL26K1TiLEGDFGSFULoTKK19jIOC/KdnUNqHUHQP1I9Bw0ysqciUcmeJUoYL0CAD2QnI4FA6T6Dceohx8IeU/3gEpbkPRZuId7w9lw2UIOWDBUqxM1B/DjIjKN3ZhY/aeb3+7x1I5yArBvVTsbYkV8r7GUqxUpCZgHohSNtA3vVBRgQy52JtSa6UmylKMeagXgLSI5DmQ2lPoTQfQ9k5gHJzX7BzCKX5BIrqgTQu5hpJeaaZFj8mElSix6BuKILVGag1EbI1T0HtqRjTuJirx5WZUt6NUYkWgbQQ1AlAKge1Z4KWJ2jPQKovxjpBPj+qzJTyToiNUIMcDmp/hsrl+AZZUt7iqBspb85QN2v51UECanq1cXVQ2HA/xP+CmtPauBv+I+Unp2e4w49xzYlBzck345oT4w7/7Efxe9VH2Cc7AMZzbKgAAAAASUVORK5CYII=" : 1,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAADqUlEQVRIicWXy4obRxSGvZg+pRfIOMYYv4bzBFZWzuiuVqulVksK8d4k9GTiRZxFNrnYkSXr1rdqqSUNgeCAMSSQQDweY7xwtvYm3sR5hGEY/ixKo9IYajQJWC74EC2d839VpaKQzp171+Pg8Ag70T4u2x42tlpvjcu2h51oHweHR1jInfAxNlJ314YTPpbyCzUPG5nO2rhQ86Rcy3WxbqS8MMC6Wcip5OI/ow8l/6Nfys0AKyn7oLIHMjyQ4YJKQ4HhzvHmNf7qLDOQclblOJVKCGYGYGUPzBiClQZgeh+k98D0vng2XPG5GYj6FZlSbo2gpBqBVbgINVyQPgAVuqB8R1LogvS+mIAZiPpqpM60RktyO4aS2hjMisAqAajs4nw9QPLWfTh8Dw5/BIc/wpVPp6BCB1QagJmeWF1tpM604yV5fQIltpRf2fkJqvHr81c4b7sgYwhWDaVckbuQJ5pTKGnESNgjJKwQH379cEn2F569fH1iAtvRHpjRB6sGSNTHSDQmytwl+QxKGlMk6jESVoQPbv6M7fgp3rddUOY26KNv4Pi/ywn9+QpM74FVAiTssehV5Er5x7tQ0pyJFdhjMIuL71TvgXItUOpbJL+YnpSX+mDVUEy4OVPmnl3enK++FoFVfCHI3wWlvkPv4fOF/Hr3NzBjAGbx+ZafRd7chZLGfOttsfXM9MCKPVD2B1xv/7IQP3v5D1i+Le6BKkeiPhG9ilx52pszKGlMxQmtjUAVH1Tqg3ItfHJC/BqbZhtUaIvTbnGweix6Fbnyeq3PoMSegmoxqMKhlYbQch04wR9S/OJvvFe8A23re2i5DrSSC6pw0WNPlblSbk+hpBaDqiNQ2cemHWB378UJ8VVnjKufT5G8+SOSX97HZoODzBBkjUG1iTJXyq0JlFTHoDIH6R6c6Inykjkeya8egAwfZEagaqzMlfJKDCXmCGSEoKILh59BfusBSPdBBgeZY2WulJfHUGKMQHoIKnjQcgNo6Q60rRa0a3egXbstXrda0FJtaNkeKO+CigGoxEWvInfpx0QEJToHFUNQwQflhqBsH1q6Cy19D1qqI0jfg5bpgbIDIS/4YsI6V+ZKeZHjVAohKB+A8h4o54KyQ0FmIDh+zrmgvC9qC+GpmVKeD7CSnD/HE2Tf4Pj947oVeVKe8bBupDw9xLpZyC9aESg9WBsXraUDt82fgtL9tfFZ8ETKDw6PcMPbxyWbg9K9t8Ylm+OG98YfxXc1/gUfklBVSMeHGAAAAABJRU5ErkJggg==" : 2,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAD10lEQVRIicWXXYsbVRzGe7HzP/kCUkopvdOP0H6Eiuiyzdtk3pLMJCvdC290UVKqV4K0paytbpNNZnJmMpPJy17ohVDQ1SK0jRRhUbzsUkWovdFSvHBZlseLk80kOrNrhaYHfjfJeZ7fzJmTk+TYsRc9dvf2cSkY4bTFsbD06XPjtMVxKRhhd28fE3mtcw8L59fnRq1zL5KfMDkWMvW5ccLkkVzKbWDeRHLZxryZyElt45lQnFmeNa+2p+SGh0PR3TEcpLUFqhOhtUEaj+Yd1Wd4kZyVfCRS7IAVPTDDBdPbYKoDprRAShOkNMGUFphqg2kOmM7BDE9kDuss+VPycheJlAJRprtgqgMqNEFyA5SvR8gbIKUFprXHcl/kDumN5FYPiZhdcbWGC1JtvPJWiJWN26j5d1Hz76Dm38HZdwcguQ5SbTCDi/lmN7nT6k3JK33EMiUnnWNztIOk8f2DxzhuiT3BSh0wM4zvHDORp5YHiKXaR6oSImUGYEWOrR9/BQD8/udf2Nr+GVvbD2cuoPXVT2CaDVbyRK7aj+9dHkzLh4ilOkCq0kfK7IKVPFzs3Yey9iUoewO0dA30xmUcL6xN5Fs//AKmtoTcCkU+oTuSv7mJRJYHSFV647t3xZ3lb4LSH4MWr2Llk1sT+Urj60he6QlRQu9/lA/F8lmheJa6g1c//GJmuXce/YGa+y0oc+N/yJc3kUh1iFRlgJQZil2s83/JAWBr+yHOrvbAChtghouUGYpsQm+025eHSKTaB6v0wMwAVPRAmgMqNECZ65AWr6LGb8/seCo0QAYXn5LqILE3Ol4rQ8RiDUBmH1QOQUYHktaGVGhCyq5DWlrDwutXsPDaRzMrIOUbkDQOKndFPqE7klsDxHIgLvogjWPn8VPUghFevuBCWryGl+TruDwcRc/+tyeQ8hvinC91RT6hO5KX+4il1AMVuyDNg6S0Ew+Yg3Hh5jeQ8k2Q6oKMQOQTuiN5sYdYjBCkByDVA8kONu8+iJXuPHoC+cotSJk6SHbEfL0r8gndkVwPEYvWBakBSPFAMgdlbUjpOs68M8S5Dz7Hufc/w5m3+5CW1iFlGqCcLeYpHZFN6tXD6R8TARJRfFBhLM/ZkDJNSOkGpPN1QboBKdMEZW1Qvh3JFT+5Uw2m5AUficgdkOyB8i4ox0FZB5SxQZnWGFu8luNijtwRHNZZmPo+p7yHI8kdyDko254lx8fvu0f3jInkGY55E8nTDubNRH6yHIDS9tw4WZ7acBf9+6B0a268530XyXf39rHKRzhl+aB087lxyvKxyv/xR/FFjb8Bo5VVEx2ERnoAAAAASUVORK5CYII=" : 3,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAADiUlEQVRIicWXS28bVRiGu8h8x/+AVlXVXfkL+QkuG9TGia/j2ySpxIKKRSUY6AaiLmDBoiTk4ozn6lsiRFWksmgQQi1NhUANeyraLio2FIkNURQ9LI7jccGOnUXdT3o00vH53uecuWl86tTrrv2DQ65Hu5y3XKYuLb8yzlsu16Nd9g8O6cnt4AFTl1cmhh08iOVnqi5TqdWJcabqxnJjbp1JE8szm0yanlzydSZNLC/6nAjT6+JqCt3j0fgYGT25KoeMTSlAFX1U0UOZdVShi1nXYyVfzxmRE8srDcaiHKFKoZYU6khuE8nVkFwNlXdQpqsXVg5HZsVyq8VIqs3uAgKU6SK5Gm9YdZJLt0ku3Wba/gop1PXOK5Gef0xeLJ9vMxKrqUOLHpKvIekVdvaeclQ7vz7TZ6Do6XlW69i8njyx2OFYFtok5pskKgGqWEdlV7HD+/TXzt5TVG4NVXJJVCPdc0xmn3yLoSx0SMy3SFQjVMlD5TZIfnwLgMfPX/TJn6Ayqyiz3icfnhvLr2wzlMUOCaupr3XB4bTl8Off/wAwfdV5WZ5eQZlOV94Znnllewz54pbeQTVCFV1Udp2ff/sDgHe+uINxcSmWP/odmVtGFTZRlVD3jSVf3GYgC1skrJbedd7hs1u/ALDx7R7y1g2M5Ccvy1M3UbkaqhyQsFq6f0h2fLcvbjGQhTaq2kBKHtMffd0Tfbq9i+18h715tzf2+PkL7OAeb15tIiVPPx0LncG5/ddc5rcYiNVGKg3E9EneuMM4lVz6Rr9iK03E6gzOne+XWx0GUm0j5QZS9Lnw3jZ29BA7/BHbv4ft/cAH7vd9O/8LO7jPhXebWl5u6P4h2bG80mYg5RZSaiBmiOQ9jKyDkd7ASH2Jcekmxtuf9+R3Hz3BmFnByNSQgq/7yq3BuZW+l4yUWgyk2ESKDcSMkEKA5DwkW8eYq2GkVjEuL8fyvWcYs2tIxkHyAWI2Bmd2ieVmk6EUGpp8hORDJOcjGRdJOxizNYzUOkZqDWN2A0k7SNbT8wqN4Zlms/9jImIscqEm6yMZD0nXkTlHk67rRWV9JBeMzIrl2ZATkQmQjI+kfSTtIWm3e/S7vwUjM2J5+ijohMx5/2fM3liecpk0sXzGYdL05GcrETKzOTHOVvpuuA/Dn5CZ2sR4338Yy/cPDrnm7nLOCpGZjVfGOSvkmvufP4qvq/4F9WhN5fQhidYAAAAASUVORK5CYII=" : 4,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAD1UlEQVRIicWXS28bVRiGu/B8Z/4AgqqquutfgJ9gq0BJfBvbM7bHl1TsqYRCCqJNUGlpUbmEOLZnznhmfI3UpEW0C8I24VLKZQmqilQJ2EQsskgURS+L43gc8HGiSnWP9Egzmu97n3M0M8fjEyee99jd28clfxNnihyhqc+fGWeKHJf8Tezu7WMgn3U3EJpenBiz7kYgP1ngCMWWJsbJAg/kSmIZkyaQa3VMmoGcMjaeirQleIreQJ5t4EgMB2RwkM5Bui3IWIKDc53365wj8wZylvcwlpwLlnXADA6mW2CZOli6BkpXwdI1QcYC021Rl2uInjGZgdxsQkreD+S6DUrXQFoFlFwK0CqgVFVMwHD6Yl+eaTaH5MU2pBSaYrZZjhfLLsLzdxG+vIbw5VWE378tjq/cQXjhS7wytwaW5aK+0AQrtKS5gbzUgZRCCyzvgnQL4YW7GDfWf30CMg7kfbEkdyBXZ7qQUmqB5Rtgeh2R+bUj5SxrQzU9qKUW1HJHmjsk70FKqQ2Wd8EydUSuBPJZ+xvQuQ9Ar30ImvoYLP4ZWHoZLMuhmj7UUhtquSvNDeQXViCl3AEzPTDDQmT+zkBevfcQ4bkWwnNt0NRNUPxTsFRfXvD7q+5Jc48tVws+mGEjMuaeX7/9A14qWmCGBWZ6YuXHks+sQEqpA9X0wbIckYWvsLW9g/Wf/8D6T4/x4Lc/D09g9UexB+RcqMU21HJPmhs87TM9jKTcBSu1wUwflHNAmRoouQiK3oLyxg0or1+DdnV1IN/a3gGllkE5R7xq5e7o3OF7TqUeRlLsggptUN4HGQ6UVA1K4gso059AOX8ToVevIXTu6qHVK8kKFJ2DzKbol2QH8mIXIyl0QGYLlPNAOsfKxiPMehs4+6YD5fwNvKDdQvXew4H4we9/Q0lWxB6f90W/JDuQmx2MJN8G5ZogwwWlbXz9y5Ox77n20X0oySoo44CyvuiXZAfyXBsjybZARhOUcUEpG7P+d9ja3vmf9NFf/0C7fh9KrALSLFCmIfqyrdG5uaHtlYwWpOg+KO2CNA4lUYcSreDlt3oIv7eG8LurOHuhAWVqUYgTdVDKAWU8kN6UZxqt4Y8JH1LSHijVAGkclLBAsSqUaAXK9JIgWoESWwbF66CkLWrTrugbkxvIUx6kaK4g6YASHBS3QLH6YeKWuJZ0gvpxmamh33NKNnAkCUcQ56C4PQQX4oPrx8lKDn3JUIxj0gTyqIVJM5CfMn1QtD4xTplDD9w73vegaG1ivN34NpDv7u3jIt/E6aIHilafGaeLHi7y//xRfF7jXzw6W4HbjRz9AAAAAElFTkSuQmCC" : 5,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAD1klEQVRIicWXS2sbVxiGs9B8R38gNSGE7NKfUPoPnLRQYsmjy4yuI7nB7dbQTjFZtElKDU0gxNF1bpqRNLJ7CYGUFqemtDhuSupNu2nB6S5ZOQUXamPM28VRdKQyurQQ5cDDCM5873PmO2dgdOLEyx6HR8dY9rZxVrMQunjrhXFWs7DsbePw6Bg9ud54gNDc6tTQGw+E/FTeQihamhqn8paQS3IF00bI43VMm56cFBP/i6QxyH+oFfK0g4lJ2aCUBVJNjmKI36rVnbfH5vTkLOtiLJkGWMYBS9tgqgmmGGBKHSxZ41fVAEtZfD7TGJsn5LkmRpL1wDIuWNoBU01Qsg5KVEHxMidRBSXrfFFph9+b9UZmCrnWxlDyre4CGmApC6TUQfEyZnJ1LJY3oXtb0L1t6M2HmLnk8e7kPF43IlfICz6GorV5WNoGKTXM5A2sfPEIQWP22ldCrrWHZxZ8IQ8vdBBI0Ue40EI454KlTbBECetbv/dku0+eYeWzh9DdH1Db+BWvL38JlrURznsIF9vBmV365GsIpNhBWGuBZR0wpYbF8mZPfH/nMejNj0FvrYDmboDJt8CUGlimKy/4vH5ItpC/vY5AFta4PGODJStY3/pNtFhvYvHmPej2d9Cd7/HquzZYogyWNrtP7vP6IdkTyDsIa03e8ngJe/sHPfne/t8D+723f4Dk9a/B1DpY1kFYa00oX1hHIMUOwrkmf4Xk2wOy6r2foRvf4v7OY7GAvw7AEhWwtIVwvtlte3C2OO0Lawik6IPlPJBqgGKrA3LpwkecN65i98kzsR1X7oJSBj/xBT84t3/PqbCGQDQflPUgqSakWAm7T//sSU7Of4rQ+SsInb+Kjb6nn/3wLiTFBGVcUN4Pzi30y7UOAsn7oGwTpFqQYhVUv/mlJ3nf2ETowjWclK8P7P8rObNP3g7O1fpeNcr5CCTbBmWaINWGFK/h3DvuwKHb2PljQPzJ548gyRVQ0galXV4/JFvIM20MJdUEKQ1QwoQ0X8FrS52B9j8/6bqzBSlaAsUMLk95oHRraK6Qp1oYitoEKS4oYYNiBqRoBdLcbZy71MDs5TuYvXwH0sVVSJEyJLkOilugZAOkesMzU63+jwkPI0m6oITDg2UDFK1y2XOiFdC8AYqZoLgNSjR4zYhMIU+4GEu8AYo5oJgFkk0ui9b5dd4AyRYoZoPiDr93TJ6QxxxMhGx3sUDzfciWmJswS8ijFqaNkEcMTJue/HTOA0XqU+N0ru/AfeD+BIrUpsZ7zo9Cfnh0jCVrG2c0FxSpvjDOaC6WrH/9UXxZ4x8llGIc3pGqIAAAAABJRU5ErkJggg==" : 6,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAADeElEQVRIicWXS2sbVxiGs/B8R7+gIYSQbX9CfoJ2vUjWXDWj0UgJgW4DwU0WccmqFEpLY8kjzX10DaRuswpxoZQSl66Mu87CUNqVW0gXNsa8XRx5jjCakVuIcuBZzOh873O+0TmDdOXKux4np2d4mO7hphNg7aNv3ho3nQAP0z2cnJ4hk2/Er7D28ZOVsRG/EvJrzQBr1c7KuNYMhFyqbWPVCLnSx6rJ5KT7+M9onuB/1Au5GaGQesgxApDhc3RPcH7PCMTcJZmZnDUS5GLFYFYEZoZghg+me2BaD0zrgTQXpLn8Wu+DGR5YPQAzI15XkCvk9gC5NFIeVA/BdA+kuiClC5I7oNoWR+6AlG2Q1uMLNKOZJM3NFXJnhIU0h2DNAQ8yQ9x6sIPy4+cof/Ydyps7KD96xtn8ll8/fg7SPf6k7JTX52QLeWuMhZwvoJGA6gF2D37HskGaC2YGXO6MFue2xkJeuj3BQtpjlFojlJopWCPE7m/L5UzbBrMClJwBr8/JnpNPkUt7jJIzRMlOeEd6D0x+Aqp8Cfrgc5QfjDLx7v4hmOaCWSGvaU9yc4X8zlPkMrcAZsdgdR9M7YKqX4E+/AKv//grk9+6PwEz+mB2Mut6mpt7efn5V9BMeffaNmj9a2xEP2Vi98UBmNIBM32UminvuiB37rE/RSHtKUqtCUrNAT/vqourloujN8cAgKM3x3j/k5ifdytGyRnxmoJMsdtvT1FIewLWGoHZCcjwQMoW3BcHWdcbyc8gpQOq+3yXt0a8piBTvF5bUxTiTED2EFSPIKk9lDd3MvHrP//Ge40+JLXHX532kM9fkinkzgSF2COQlUDSfUhyFy/3DzP53c4PkOQuJN0HWQmf2xwX5zlzR43sMXJpjEDWEFSPIake7nZ/zMQv9w8hVbcgKT2QEYLMlM8vypsh5NYIuZhDUH0A0iNcdRIc/XOcycuPvodUc0GqDzJikDnIz7mAkNeHKMRIQVoMUgJItT6kdRdSdRvSeg8k+yA1AukJyBgU58wx92MiRSFawgVKwGU1jyP7/J4a8TnLcuYQcjVBIUoMUiKQHM4IZoQgOeKfL8u4gJDLES5FLVzMZevnEPJqgFUj5BUPqyaTX7dTUKW/Mq7bcxvu0+RXUKW3Mu5Hvwj5yekZ7gV7uOEkoIr71rjhJLgXXPij+K7GvwC8PogAG3AnAAAAAElFTkSuQmCC" : 7,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAD1ElEQVRIicWXXW/bVBjHdxE/J19graZp2t2+wvoRUu661IljJ7YTt0V8gIo1aEyi3Q2TQAgoaeL4JbHz0qYSFVyA2EBCVCtC4V0gsdFJu6DbLhiIC6iq6s/FobYDdtchLTvST1GOz/P/HR89cpxTp5712D84xBV/B+cNB6mZt58a5w0HV/wd7B8cIpBX27eQurQ6NqrtW6H8TMVBarY2Ns5UnFAu5OoYN6FcamLcBHJSbDwxshXyP+pDudrCYym5nKIDKtocxeIUbT5/tOYEeYGc6R6ORWuDqS2wkgNWtMGUJphshihNsKLFr6stvv4xmaG83EEiug+meWCqC1a0QbIJkuqgfC1EqoNkk29Mdf+R+8mZ5U5EbvSQSKUDprfBSg4X52uYenEdVW8b1fY2qt42Mq9s8U3IJr97vc0lx+SG8rk+YjmSay1Q0cJkxcLw5weIG7v3f8fU0iaoaIFpLV5n9OJz5/qhPL2wjljm+0gbHTDdBVMauPntvUB286u7qDofY/DZjyMbYIoJprtIGx1en5AdkW8glvl1pCsdMM0FK9RH7lSYXoEwvQx67hqGt/eCeSY3wDQX6UqH1ydkh/LnB4hlYQNpoxvId+//FkgGn/6AC/qbmBCvY3fvEQCg8dF3YHKdy40ur0/IPrlcdcAKa5ha7OLXP/4cOYGj79cHO5hUa2CFJ5UvDBDL0bGrDpi0hkm1hsYHX8c33N4jTC12wKQ1sJITOfb47LDbFzYQy3wfrOKDSjZIqmF450EgulB+Cy+88T6GP/0SOYW/QPl3QCULrOzz+oTs8PE6t4FYjD5I9yEoNi4ubQaSJesTpDIrSGWWkcqsjDRcZvk9CIoN0n1en5Adyo11xFLpgTTvP/Lh7T2czr2O1PQ1nBZfCxoOAC5e3uRyzeP1CdmhvNxHLHoPpHog2YGQq2N45+FIo9348u5IA9745h6E3BpIdnid3o3PLUceMqT1EIvaBZV8kOxCyDcxoVpofPh9bMO9ujnEhGpByJsg2eV1ajc+V4s8XqnURSzFDkjxQXIbJNkQRBNCtgZhZhWZq1vIvPwuMle3IMys8nnRBEk2X6/4vD4hO/Iy4SMR2QMV2iDJBeVtkGhCyNYhZNcgXKrxz2wdJJr8uuTy9bKXnKn4EXnBw7FIbZDUAuVdUM4GiRZothkiWnw+7/J1Uvv4vELk95zyLZyInAvKOSDRAYl2BIfP59yT5eQjbzI062DchPKshXETyM+WfVC2OTbOliMN95L3BShrjo3Lrc9D+f7BIRadHZwzPFC28dQ4Z3hYdP71R/FZjb8Bql9vsefENFAAAAAASUVORK5CYII=" : 8,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAD20lEQVRIicWXTW8bRRjHe8g+409AVVVVT7x8AiifgDTtAWrHXu+Lnd2NgwDRA1JF5apCoCRFcOgBtfFrdmzv+i0BpFYqCKXAhTQIpRRxTHCBS5tLq6pIJYqiP4cxO3brdQJS3ZF+0mo88/89MzualQ/gGbYDALC9s4vz/hqOOhxjb1x6ahx1OM77a9je2ZXybO0Gxk5dHhnZ2g0pP2RzjMVyI+OQzaVciRdGjpSr5ZETyEl3/zvaouR/zJfyVHVvzIrA4CDDfRKTi9/3k5WqSjmb8oaTroGlqmAmBzNcML0MppUEehlMXwQzXbBUBSxdFeP3yJRyqx7OlA+W9kSw4YK0EkgtgBI5gZoHJYsgvSyKS1W7An9orpQ7zcHYjW4BNTCTd8U5HHu/jay3iqz3A7LeKl581wMlCyB9URRp+WJuWK7T7JFPtwbjNMHsOli6CtLLOOi4uP7LnwOvyrfz34kCTFcUazfCc6dbUh6ZaQ8m00TE9sHSHEwrYHl1I5Bdv/U7spXvce/ho6Dv+OwVMKMENlVFxKkjkmmFZvfIlwYz3ULE8sFMFy+drgeSzp37oJMXQCfmkfz4y6B/eXUDTCuApTgidh2RTDs0W8rfXB5Mpi1Wbro4PndVrvrn24GcTswH/ff++hssmRdypy5WGZK9T3kdLOXi1eznUvLwEQ6qF6FMzEGZmOt790xdADNdsfJ9yWeWB5NpI2I3xAlOFrH+21ZfASs3O+jcud8vTyyAGS4i1r/bPjhbnvaZpcFk2mBOA2xKnPZjZ5ewvrnVJ1u52Qme1ze3QGpOnHjbB8u0QrMDOU0vDcZpg+wmKO1BMVwoiTyU6Gd45T0fr51r4nnrMtT5LwJ58ZtfoagFcc1adTE/JFvKnXY4VhOU9kEGh6IWocQuQXn9IsZOfoKXT/O+bX/hnRqUZEnc31YDZLdCc6XcaoUz1QClPJDOMT57DZ27D7By6w+sb9zt2/63Fr6FEs+DNBdkeqB0Y2iulKeb4aQaIMMDaRWMz36Fx9v65hbUT7+GEstBSZRBWgVk+mLekFwpNxvhGHWQ7oGSVVDCxfhH1zD+4VWMf3AFz5llKKcWoMQKoHgZpHKQVgMZ/vBMs9Ej1/1wNA+UrIHUCijhgiZLUGJFKNEClGgBFCsKccIVY7SamDMsU/d75ElvOGoNlKiCEhw0ufgkcQ5KVMQ4tbZ3XrLney6C9yBeEZJJDpp0u3DRF68I9pPTRcpjfORIeXRx5ATyw5YPipZHxmGr58Cd834CRUsj42z1Rynf3tnFGb6GI44HihafCsrEHI44Hs7wx/4oPqv2D254R+OSQ4FOAAAAAElFTkSuQmCC" : 9
};
const VAL_POS = new Array();


const USERNAME_INPUT_ID = 'val_cel_dentifiant';
const PASSWORD_INPUT_ID = 'cs';

function _imgToBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
}

function _get(id) {
    return document.getElementById(id);
}

// getElementById(id).value = value
function _set(id, value) {
    return document.getElementById(id).value = value;
}

function parseImgs() {
    for(var i = 0 ; i <= 9 ; i++) {
        var img = _get('val_cel_' + i).firstChild.firstChild;
        var b64 = _imgToBase64(img);
        var val = IMG_VAL[b64];
        VAL_POS[val] = i;
    }
}

function getPositionsFromValue(value) {
    var positions = '';
    for(var i = 0 ; i < value.length ; i++) {
        var v = value.charAt(i);
        var p = VAL_POS[v];
        positions += p;
    }
    return positions;
}

function execute(credential) {
    _set(USERNAME_INPUT_ID, credential.username);
    console.error(credential.password + ":" + getPositionsFromValue(credential.password));
    _set(PASSWORD_INPUT_ID, getPositionsFromValue(credential.password));
    document.forms["formAccesCompte"].submit();
}

parseImgs();
self.port.on('execute', execute);