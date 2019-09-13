const VK = require('vk-io'); // подключение библиотек и прочее
const Keyboard = require('vk-io'); // подключение библиотек и прочее
const vk = new VK({
    token: 'f99386c05a9e06cabccfb27d2dc6e33ef3628a1b0276fc0d388d6c4994171f5689f72a394ccb94415b3e0'
}); // подключение сообщества

var zvonki1 = `
I смена:


Понедельник:

0) 8:00 - 8:30 (кл.час)
1) 8:35 - 9:15
2) 9:25 - 10:05
3) 10:15 - 10:55
4) 11:05 - 11:45
5) 11:50 - 12:30
6) 12:35 - 13:15

Вторник - Пятница:

1) 8:00 - 8:40
2) 8:45 - 9:25
3) 9:40 - 10:20
4) 10:35 - 11:15
5) 11:30 - 12:10
6) 12:15 - 12:55
7) 13:00 - 13:40 (10,11 классы по четвергам)

Суббота:

1) 8:00 - 8:40
2) 8:45 - 9:25
3) 9:30 - 10:10
4) 10:15 - 10:55
5) 11:00 - 11:40
6) 11:45 - 12:25

Пятница (совещание)

1) 8:00 - 8:40
2) 8:45 - 9:25
3) 9:35 - 10:15
4) 10:25 - 11:05
5) 11:15 - 11:55
6) 12:00 - 12:40
`

var zvonki2 = `
II смена:

Понедельник:

0) 13:45 - 14:10
1) 14:15 - 14:55
2) 15:05 - 15:45
3) 15:55 - 16:35
4) 16:45 - 17:25
5) 17:30 - 18:10
6) 18:15 - 18:55

Вторник - Пятница

0) 13:00 - 13:40
1) 13:45 - 14:25
2) 14:35 - 15:15
3) 15:25 - 16:05
4) 16:15 - 16:55
5) 17:00 - 17:40
6) 17:45 - 18:25
`

vk.updates.on('message', (context, next) => {
	const { messagePayload } = context;

	context.state.command = messagePayload && messagePayload.command
		? messagePayload.command
		: null;

	return next();
});

const hearCommand = (name, conditions, handle) => {
	if (typeof handle !== 'function') {
		handle = conditions;
		conditions = [`/${name}`];
	}

	if (!Array.isArray(conditions)) {
		conditions = [conditions];
	}

	vk.updates.hear(
		[
			(text, { state }) => (
				state.command === name
			),
			...conditions
		],
		handle
	);
}; // подключение работы

// начало работы

hearCommand('начать', (context, next)=> {
    context.state.command = 'помощь';

    return Promise.all([
        context.send('Привет!'),

        next()
    ]);
});

hearCommand('помощь', async (context) => {
	await context.send({
		message: `
Меня зовут Хауди, вот список команд для работы со мной:


/помощь - список команд
/звонки - расписание звонков
/уроки - расписание уроков (пока недоступно)
/экзамены - Интернет-ресурсы для подготовки к экзаменам
		`,
		keyboard: Keyboard.keyboard([
			Keyboard.textButton({
				label: 'Список команд',
				payload: {
					command: 'помощь'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Расписание звонков',
				payload: {
					command: 'звонки'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Расписание уроков',
				payload: {
					command: 'уроки'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Подготовка к экзаменам',
				payload: {
					command: 'экзамены'
				},
				color: Keyboard.POSITIVE_COLOR
			})
		])
	})
});

hearCommand('звонки', async (context) => {
		await context.send({
			message: `
Какая смена?
`,
		keyboard: Keyboard.keyboard([
			Keyboard.textButton({
				label: `1 смена`,
				payload: {
					command: 'zvonki1'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: `2 смена`,
				payload: {
					command: 'zvonki2'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: `Главное меню`,
				payload: {
					command: 'помощь'
				},
				color: Keyboard.PRIMARY_COLOR
			})
		])
		})
});

hearCommand('zvonki1', async(context) => {
	await Promise.all([
		context.send(zvonki1)
	])
})

hearCommand('zvonki2', async(context) => {
	await Promise.all([
		context.send(zvonki2)
	])
})

hearCommand('уроки', async (context) => {
	await Promise.all([
		context.send(`
Постоянного расписания пока еще нет...
Как только оно появится, мы сразу оповестим вас об этом!
		`)
	])
})
hearCommand('экзамены', async(context) => {
	await Promise.all([
		context.send({
			message: `
Мы подготовили для вас Интернет-ресурсы, которые помогут вам потренироваться и подтянуть знания к экзаменам.
Выберите свой предмет из списка ниже:
		`,
		keyboard: Keyboard.keyboard([
			Keyboard.textButton({
				label: 'Русский язык',
				payload: {
					command: 'русский'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Математика',
				payload: {
					command: 'матан'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Физика',
				payload: {
					command: 'физика'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Обществознание',
				payload: {
					command: 'общество'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Английский язык',
				payload: {
					command: 'инглиш'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'География',
				payload: {
					command: 'география'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'История',
				payload: {
					command: 'история'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Биология',
				payload: {
					command: 'биология'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Химия',
				payload: {
					command: 'химия'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
			Keyboard.textButton({
				label: 'Главное меню',
				payload: {
					command: 'помощь'
				},
				color: Keyboard.PRIMARY_COLOR
			}),
		])
		})
	])
})
hearCommand('русский', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://rus-oge.sdamgia.ru
ЕГЭ:
https://rus-ege.sdamgia.ru
`)
	])
})

hearCommand('матан', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://oge.sdamgia.ru
ЕГЭ:
https://ege.sdamgia.ru
`)
	])
})

hearCommand('физика', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://phys-oge.sdamgia.r
ЕГЭ:
https://phys-ege.sdamgia.r
`)
	])
})

hearCommand('общество', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://soc-oge.sdamgia.ru
ЕГЭ:
https://soc-ege.sdamgia.ru
`)
	])
})

hearCommand('инглиш', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://en-oge.sdamgia.ru/
ЕГЭ:
https://en-ege.sdamgia.ru/
`)
	])
})

hearCommand('география', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://geo-oge.sdamgia.ru
ЕГЭ:
https://geo-ege.sdamgia.ru
`)
	])
})

hearCommand('история', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://hist-oge.sdamgia.ru/
ЕГЭ:
https://hist-ege.sdamgia.ru/
`)
	])
})

hearCommand('биология', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://bio-oge.sdamgia.ru
ЕГЭ:
https://bio-ege.sdamgia.ru
`)
	])
})

hearCommand('химия', async(context) =>{
	await Promise.all([
		context.send(`
Держи ссылки!
ОГЭ:
https://chem-oge.sdamgia.ru
ЕГЭ:
https://chem-ege.sdamgia.ru
`)
	])
})

vk.updates.start().catch(console.error);
