-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: taskdb
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` longtext,
  `status` int NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_task_idx` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (13,'aaaaa','aaaaaa',2,1),(14,'Task 13','this is task 13 added',2,1),(15,'task 15','task added',2,1),(16,'task one','adasdada',3,1),(17,'20','jjust created',2,2),(18,'20','jjust created',2,2),(21,'101010','101010',3,7),(22,'111','111',1,7),(23,'a','v',1,10),(24,'v','v',1,10),(25,'1','b',1,10),(26,'21','21',1,1),(29,'q`','q',2,9),(30,'333','333',1,9),(31,'111','111',2,12);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a@a.com','$2a$10$TZrBak03uEv5uhYyEWXk8.bu3CgJzIQA.cLmW1tN6j0NugeAVh.nq','123456','1234567','1234567',1),(2,'b@b.com','$2a$10$TZrBak03uEv5uhYyEWXk8.bu3CgJzIQA.cLmW1tN6j0NugeAVh.nq','abqb',NULL,NULL,2),(3,'c@c.com','$2a$10$zeZ1jqMmZqEeujCz5jayv.ak.qqe8XQH6mNqRq55iLZyh4ndfL2lO','abqb',NULL,NULL,2),(4,'v@c.com','$2a$10$NTgV5vMfNA4YcSxvYkU29ejmI7KAKaBFMbWiHhvHGgN0WGOHSb4cm','abqb',NULL,NULL,2),(5,'3@c.com','$2a$10$yIxvyjE8rBT91iTC6aUxkO60QNzD/Vtncx0UnVeJTZSluQCISBvWK','abqb',NULL,NULL,2),(6,'4@c.com','$2a$10$8PmG9iPAFCBPkzRZYxdkveDFIrGWbo/QefCr1V0PR0NxmAQAarnaW','abqb',NULL,NULL,2),(7,'1@a.com','$2a$10$XZYx.Sr0h9BpKmEpaBsUo.OC0K3gE6tcMeC1jOTw5JGoR5SE/lEn.','a1a1','a1a1','a1a1',1),(8,'andi@andi.com','$2a$10$PUM2w73gglZ0DizR2u6eUOL5gTOFLwJydXLjp.mklGGdtxjxImtLy','andi',NULL,NULL,2),(9,'alban@alban.com','$2a$10$Add9/boTYmUbVn6FfWVLNuXWSmoZEeUXb1AaxYFhFDD.txohj1.TK','nabla','halaj','IT1',2),(10,'l@l.com','$2a$10$K1pYDXdZ9RWPlj1Xyqnr.umeL7vR.NxQtsDeazcl.aMNYMsVBDGPi','lll',NULL,NULL,2),(11,'alban@halaj.com','$2a$10$0SIomhd2RYXGhpYyC16xiOc40VaTkpBjKZCTWdvAaZ7hO2F2l2FjC','alban',NULL,NULL,2),(12,'alban.halaj@gmail.com','$2a$10$Q8fI2fOGygSqAVrSZPrP2e6doHcz5kDQGg/NtmsGBwoisDvH9FoqG','alban',NULL,NULL,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 21:19:30
