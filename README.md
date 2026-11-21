# Minecraft Education Starter

Открой эту папку в VS Code. В `main.ts` регистрируются команды чата, а в `greeting.ts` написано действие команды `hello`. Каждый новый файл `.ts` добавляй в список `files` в `pxt.json`. В MakeCode этот язык называется JavaScript.

## Загрузка в Minecraft Education

1. Создай пустой публичный репозиторий на GitHub и отправь туда эти файлы. Они должны лежать в корне репозитория.

   ```bash
   git add README.md main.ts greeting.ts pxt.json
   git commit -m "Start Minecraft Education project"
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

   Замени `USERNAME/REPO` на имя своего аккаунта и репозитория.

2. Открой мир в Minecraft Education, нажми `C` и создай проект в MakeCode.
3. Открой **Extensions**, вставь адрес репозитория GitHub в поиск и выбери расширение.
4. Переключись на **JavaScript** и вставь эту строку в редактор:

   ```typescript
   educationStarter.registerCommands()
   ```

5. Нажми **Play** в MakeCode и введи `hello` в игровом чате. В чате появится приветствие.

[Руководство MakeCode по подключению расширения с GitHub](https://minecraft.makecode.com/extensions/publish)
