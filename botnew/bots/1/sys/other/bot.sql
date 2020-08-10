-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июл 30 2020 г., 11:28
-- Версия сервера: 5.7.23-0ubuntu0.16.04.1
-- Версия PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `botnew0`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `id` int(11) UNSIGNED NOT NULL,
  `myid` int(11) UNSIGNED DEFAULT NULL,
  `sender` int(11) UNSIGNED DEFAULT NULL,
  `checked` int(11) UNSIGNED DEFAULT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `media` text COLLATE utf8mb4_unicode_520_ci,
  `unix` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `config`
--

CREATE TABLE `config` (
  `id` int(11) UNSIGNED NOT NULL,
  `unix` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Дамп данных таблицы `config`
--

INSERT INTO `config` (`id`, `unix`) VALUES
(1, 1595860974),
(2, 1595861195),
(3, 1595861216);

-- --------------------------------------------------------

--
-- Структура таблицы `keyboard1`
--

CREATE TABLE `keyboard1` (
  `id` int(11) UNSIGNED NOT NULL,
  `numanswer` int(11) UNSIGNED DEFAULT NULL,
  `textanswer` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `messageid` int(11) UNSIGNED DEFAULT NULL,
  `row` int(11) UNSIGNED DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Дамп данных таблицы `keyboard1`
--

INSERT INTO `keyboard1` (`id`, `numanswer`, `textanswer`, `messageid`, `row`, `color`) VALUES
(1, 1, 'Возможности', 2, 1, 'positive'),
(2, 2, 'Тех. Поддержка', 3, 2, 'default'),
(3, 3, 'Оставить заявку', 4, 2, 'primary');

-- --------------------------------------------------------

--
-- Структура таблицы `keyboard2`
--

CREATE TABLE `keyboard2` (
  `id` int(11) UNSIGNED NOT NULL,
  `numanswer` int(11) UNSIGNED DEFAULT NULL,
  `textanswer` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `messageid` int(11) UNSIGNED DEFAULT NULL,
  `row` int(11) UNSIGNED DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Дамп данных таблицы `keyboard2`
--

INSERT INTO `keyboard2` (`id`, `numanswer`, `textanswer`, `messageid`, `row`, `color`) VALUES
(1, 1, 'Оставить заявку', 4, 1, 'positive'),
(2, 2, 'Тех. Поддержка', 3, 2, 'default'),
(3, 3, 'Медиа файды', 5, 2, 'primary'),
(4, 4, 'Вернуться в меню', 1, 3, 'negative');

-- --------------------------------------------------------

--
-- Структура таблицы `keyboard3`
--

CREATE TABLE `keyboard3` (
  `id` int(11) UNSIGNED NOT NULL,
  `numanswer` tinyint(1) UNSIGNED DEFAULT NULL,
  `textanswer` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `messageid` int(11) UNSIGNED DEFAULT NULL,
  `row` tinyint(1) UNSIGNED DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Дамп данных таблицы `keyboard3`
--

INSERT INTO `keyboard3` (`id`, `numanswer`, `textanswer`, `messageid`, `row`, `color`) VALUES
(1, 1, 'Вернуться в меню', 2, 1, 'negative');

-- --------------------------------------------------------

--
-- Структура таблицы `leed`
--

CREATE TABLE `leed` (
  `id` int(11) UNSIGNED NOT NULL,
  `myid` int(11) UNSIGNED DEFAULT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `checked` int(11) UNSIGNED DEFAULT NULL,
  `unix` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `message`
--

CREATE TABLE `message` (
  `id` int(11) UNSIGNED NOT NULL,
  `text` text COLLATE utf8mb4_unicode_520_ci,
  `keyboard` int(11) UNSIGNED DEFAULT NULL,
  `functions` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `media` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Дамп данных таблицы `message`
--

INSERT INTO `message` (`id`, `text`, `keyboard`, `functions`, `media`) VALUES
(1, 'Привет,\nЯ автоматически созданный бот!', 1, '', ''),
(2, 'Мои возможности: \n\n-Работа 24/7 \n-Собирать заявки \n-Делать рассылки \n-Отправлять любые медиафайлы \n-Чат с тех. поддержкой \n\nТакже у нас есть мобильное приложение и web-интерфейс для отслеживания статистики бота, импорта заявок и чат с клиентами! \n\nПопробуй некоторые функции сейчас!', 2, 'bot', ''),
(3, 'Напишите свое сообщение менеджеру!', 3, 'chat', ''),
(4, 'Напишите комментарий к заявке!', 3, 'buffer', ''),
(5, 'Наш бот может отправлять любые медиа файлы', 3, '', 'file_1595861528.jpg'),
(6, 'Спасибо за заявку!', 2, 'afterBuffer;leed', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `userid` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `message` int(11) UNSIGNED DEFAULT NULL,
  `messanger` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `status` int(11) UNSIGNED DEFAULT NULL,
  `buffer` varchar(191) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `unix` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `keyboard1`
--
ALTER TABLE `keyboard1`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `keyboard2`
--
ALTER TABLE `keyboard2`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `keyboard3`
--
ALTER TABLE `keyboard3`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `leed`
--
ALTER TABLE `leed`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `keyboard1`
--
ALTER TABLE `keyboard1`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `keyboard2`
--
ALTER TABLE `keyboard2`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `keyboard3`
--
ALTER TABLE `keyboard3`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `leed`
--
ALTER TABLE `leed`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
