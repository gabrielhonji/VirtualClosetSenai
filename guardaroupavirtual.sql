-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Maio-2024 às 14:06
-- Versão do servidor: 10.4.25-MariaDB
-- versão do PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `guardaroupavirtual`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clothes`
--

CREATE TABLE `clothes` (
  `id_clothes` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `descripction` varchar(150) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `type_id_type` int(10) UNSIGNED NOT NULL,
  `size_id_size` int(10) UNSIGNED NOT NULL,
  `color_id_color` int(10) UNSIGNED NOT NULL,
  `favorite` tinyint(1) NOT NULL,
  `image` varchar(50) NOT NULL,
  `tag_id_tag` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `color`
--

CREATE TABLE `color` (
  `id_color` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `color`
--

INSERT INTO `color` (`id_color`, `name`) VALUES
(1, 'rosa'),
(2, 'azul'),
(3, 'vermelho');

-- --------------------------------------------------------

--
-- Estrutura da tabela `size`
--

CREATE TABLE `size` (
  `id_size` int(10) UNSIGNED NOT NULL,
  `size` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `size`
--

INSERT INTO `size` (`id_size`, `size`) VALUES
(1, 'p'),
(2, 'pp'),
(3, 'gg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(10) UNSIGNED NOT NULL,
  `tag` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tag`
--

INSERT INTO `tag` (`id_tag`, `tag`) VALUES
(1, 'verao'),
(2, 'verao');

-- --------------------------------------------------------

--
-- Estrutura da tabela `type`
--

CREATE TABLE `type` (
  `id_type` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `type`
--

INSERT INTO `type` (`id_type`, `name`) VALUES
(1, 'calça'),
(2, 'blusa'),
(3, 'jaqueta');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(21, 'maria', 'oi', 'duda'),
(22, 'duda', 'maria', '123'),
(25, 'maria', 'duda', '1'),
(26, 'gab', 'gab', '2');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clothes`
--
ALTER TABLE `clothes`
  ADD PRIMARY KEY (`id_clothes`) USING BTREE,
  ADD UNIQUE KEY `tag_id_tag` (`tag_id_tag`),
  ADD KEY `fk_clothes_user_idx` (`user_id`),
  ADD KEY `fk_clothes_size1_idx` (`size_id_size`),
  ADD KEY `fk_clothes_color1_idx` (`color_id_color`),
  ADD KEY `fk_clothes_type1_idx` (`type_id_type`) USING BTREE;

--
-- Índices para tabela `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`);

--
-- Índices para tabela `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id_size`);

--
-- Índices para tabela `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Índices para tabela `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clothes`
--
ALTER TABLE `clothes`
  MODIFY `id_clothes` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `color`
--
ALTER TABLE `color`
  MODIFY `id_color` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `size`
--
ALTER TABLE `size`
  MODIFY `id_size` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `clothes`
--
ALTER TABLE `clothes`
  ADD CONSTRAINT `fk_clothes_color1` FOREIGN KEY (`color_id_color`) REFERENCES `color` (`id_color`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_clothes_size1` FOREIGN KEY (`size_id_size`) REFERENCES `size` (`id_size`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_clothes_type1` FOREIGN KEY (`type_id_type`) REFERENCES `type` (`id_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_clothes_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
