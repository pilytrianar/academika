-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `roleId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_roleId_idx`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_profiles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `birthDate` DATE NULL,
    `phone` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `avatarUrl` VARCHAR(500) NULL,
    `studentId` VARCHAR(20) NULL,
    `courseId` INTEGER UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_profiles_userId_key`(`userId`),
    UNIQUE INDEX `user_profiles_studentId_key`(`studentId`),
    INDEX `user_profiles_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guardians` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userProfileId` INTEGER UNSIGNED NOT NULL,
    `fullName` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `relationship` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `guardians_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `section` VARCHAR(10) NOT NULL,
    `year` YEAR NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `courses_name_section_year_key`(`name`, `section`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subjects_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject_courses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER UNSIGNED NOT NULL,
    `courseId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `subject_courses_courseId_idx`(`courseId`),
    UNIQUE INDEX `subject_courses_subjectId_courseId_key`(`subjectId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject_teachers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `teacherId` INTEGER UNSIGNED NOT NULL,
    `subjectCourseId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `subject_teachers_subjectCourseId_idx`(`subjectCourseId`),
    UNIQUE INDEX `subject_teachers_teacherId_subjectCourseId_key`(`teacherId`, `subjectCourseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER UNSIGNED NOT NULL,
    `subjectCourseId` INTEGER UNSIGNED NOT NULL,
    `value` DECIMAL(4, 2) NOT NULL,
    `period` TINYINT NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `grades_studentId_idx`(`studentId`),
    INDEX `grades_subjectCourseId_idx`(`subjectCourseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinary_notes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `severity` VARCHAR(20) NOT NULL,
    `date` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `disciplinary_notes_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `type` VARCHAR(50) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `notifications_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calendar_events` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `allDay` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(50) NOT NULL,
    `courseId` INTEGER UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `calendar_events_courseId_idx`(`courseId`),
    INDEX `calendar_events_startDate_idx`(`startDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_profiles` ADD CONSTRAINT `user_profiles_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guardians` ADD CONSTRAINT `guardians_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `user_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_courses` ADD CONSTRAINT `subject_courses_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_courses` ADD CONSTRAINT `subject_courses_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_teachers` ADD CONSTRAINT `subject_teachers_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `user_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_teachers` ADD CONSTRAINT `subject_teachers_subjectCourseId_fkey` FOREIGN KEY (`subjectCourseId`) REFERENCES `subject_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `user_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_subjectCourseId_fkey` FOREIGN KEY (`subjectCourseId`) REFERENCES `subject_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disciplinary_notes` ADD CONSTRAINT `disciplinary_notes_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `user_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
