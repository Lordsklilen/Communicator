using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net;

namespace Communicator.DataProvider.Repositories
{
    public class FileRepository
    {

        public void SaveImage(IFormFile file, string UserId)
        {
            var filename = UserId + ".jpg";//Path.GetExtension(file.FileName);
            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "Communicator",
                "ProfileImages"
                );
            Directory.CreateDirectory(path);

            using (var fileStream = new FileStream(Path.Combine(path, filename), FileMode.Create))
            {
                file.CopyToAsync(fileStream).Wait();
            }
        }

        public string GetProfileImage(string UserId)
        {

            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "Communicator",
                "ProfileImages",
                UserId + ".jpg"
                );

            if (File.Exists(path))
            {
                return path;
            }
            else
                return GetDefaultPicture();
        }

        public string GetGroupImage()
        {

            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "Communicator",
                "default-group.png"
                );

            if (File.Exists(path))
            {
                return path;
            }
            else
                return GetDefaultPicture();
        }

        private string GetDefaultPicture()
        {
            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                "Communicator",
                "default.png"
                );
            if (!File.Exists(path))
            {
                using (WebClient client = new WebClient())
                {
                    client.DownloadFile(new Uri("https://ptetutorials.com/images/user-profile.png"), path);
                }
            }
            return path;
        }

    }
}
