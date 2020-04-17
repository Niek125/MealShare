-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2020 at 03:19 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mealshare/4`
--

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

CREATE TABLE `meal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `price` float NOT NULL,
  `image` varchar(255) NOT NULL,
  `buyersid` int(11) DEFAULT NULL,
  `makerid` varchar(255) NOT NULL,
  `fcmtoken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `meal`
--

INSERT INTO `meal` (`id`, `name`, `startTime`, `endTime`, `price`, `image`, `buyersid`, `makerid`, `fcmtoken`) VALUES
(1, 'W', '2020-04-09 16:00:00', '2020-04-09 19:00:00', 4.5, 'https://picsum.photos/510/300?random', 1, '1', ''),
(2, 'X', '2020-04-09 11:00:00', '2020-04-09 14:00:00', 2.5, 'https://picsum.photos/400/400?random', 1, '1', ''),
(3, 'Testmeal', '2020-04-18 06:00:00', '2020-04-18 08:00:00', 4.5, 'https://picsum.photos/510/300?random', 1, '1', ''),
(4, 'testing 2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 4.5, 'https://picsum.photos/510/300', NULL, 'd-75sAhQ1U-WDTA-FTGB7a:APA91bEKu2Q6rNbCqSTZgtTojC-hLPhqbeynIQqKbI5XETSdm4JmpAuaMzBGpZjDlKow5P-Sfw-lkZ_0sUocfjfrJPBTBPAHuf9PQxEsEZH-1GASbmC5dByil-3dpW-uk6pDudAgTPOH', ''),
(5, 'testing 3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 'https://picsum.photos/510/300', 1, '1', 'd-75sAhQ1U-WDTA-FTGB7a:APA91bEKu2Q6rNbCqSTZgtTojC-hLPhqbeynIQqKbI5XETSdm4JmpAuaMzBGpZjDlKow5P-Sfw-lkZ_0sUocfjfrJPBTBPAHuf9PQxEsEZH-1GASbmC5dByil-3dpW-uk6pDudAgTPOH'),
(6, 'testing 4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 'https://picsum.photos/510/300', 1, '1', 'd9q1PLc64ISqzOTykWXze2:APA91bEIK4kMidIVY25Cyj3EPMyS3nDTM-XZdeN-3BJDTK3GA6zQDK8-AC7FgtnW2NvH6OiN8c80AuE0Q0NnViO5hmFWG2NnvAj7nIOPR6_lmQ6BaRcB8kTFUHF69Xp9Io9YDsi-Xb1W'),
(7, 'dfsg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 'https://picsum.photos/510/300', NULL, '1', 'd-75sAhQ1U-WDTA-FTGB7a:APA91bEKu2Q6rNbCqSTZgtTojC-hLPhqbeynIQqKbI5XETSdm4JmpAuaMzBGpZjDlKow5P-Sfw-lkZ_0sUocfjfrJPBTBPAHuf9PQxEsEZH-1GASbmC5dByil-3dpW-uk6pDudAgTPOH');

-- --------------------------------------------------------

--
-- Table structure for table `meal_tag`
--

CREATE TABLE `meal_tag` (
  `id` int(11) NOT NULL,
  `mealid` int(11) NOT NULL,
  `tagid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `meal_tag`
--

INSERT INTO `meal_tag` (`id`, `mealid`, `tagid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `mealid` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `mealid`, `comment`, `rating`) VALUES
(1, 1, '', 2),
(2, 1, NULL, 4),
(3, 2, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'A'),
(2, 'B');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `longitude`, `latitude`) VALUES
(1, 'A', 5, 51.4416);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_meal_buyersid` (`buyersid`),
  ADD KEY `fk_meal_makerid` (`makerid`);

--
-- Indexes for table `meal_tag`
--
ALTER TABLE `meal_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_meal_tag_mealid` (`mealid`),
  ADD KEY `fk_meal_tag_tagid` (`tagid`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_review_mealid` (`mealid`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meal`
--
ALTER TABLE `meal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `meal_tag`
--
ALTER TABLE `meal_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meal`
--
ALTER TABLE `meal`
  ADD CONSTRAINT `fk_meal_buyersid` FOREIGN KEY (`buyersid`) REFERENCES `user` (`id`);

--
-- Constraints for table `meal_tag`
--
ALTER TABLE `meal_tag`
  ADD CONSTRAINT `fk_meal_tag_mealid` FOREIGN KEY (`mealid`) REFERENCES `meal` (`id`),
  ADD CONSTRAINT `fk_meal_tag_tagid` FOREIGN KEY (`tagid`) REFERENCES `tag` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_review_mealid` FOREIGN KEY (`mealid`) REFERENCES `meal` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
