const cpx = (...item) => {
    if (item[0] == "cls") {
        cls();
        item.forEach((q,i) => {
            if(i != 0) {
                console.log(q)
            }
        })
    }
    else {
        item.forEach(q => {
            console.log(q)
        })
    }
}


const tipo = {
    unix: () => {
        return new Date().getTime();
    },
    y: () => {
        return new Date().getFullYear();
    },
    mo: () => {
        return new Date().getMonth();
    },
    w: () => {
        return new Date().getDay();
    },
    d: () => {
        return new Date().getDate();
    },
    h: () => {
        return new Date().getHours();
    },
    mi: () => {
        return new Date().getMinutes();
    },
    s: () => {
        return new Date().getSeconds();
    },
    ms: () => {
        return new Date().getMilliseconds();
    },
    ll: (returnArray = false) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfWeek = date.getDay();
        const dayOfMonth = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const millisecond = date.getMilliseconds();

        if (returnArray) {
            return [year, month, dayOfWeek, dayOfMonth, hour, minute, second, millisecond];
        } else {
            return {
                year,
                month,
                dayOfWeek,
                dayOfMonth,
                hour,
                minute,
                second,
                millisecond
            };
        }
    }


}

const cls = () => {
    console.clear();
}
const spl = (str, bl = "") => {
    return str.split(bl);
}

module.exports ={

    spl:spl,
    cls:cls,
    tipo:tipo,
    cpx:cpx
}