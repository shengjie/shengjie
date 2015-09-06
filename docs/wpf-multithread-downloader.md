# [WPF] Multithread download software

## Introduction

By using HttpWebRequest and Thread, I had created a multi-thread download software.
It composed with 2 parts: UI and download library. the UI part was realized by WPF and the download library is a windows dll.

![image](docs/res/wpf-multithread-downloader.png "Main window")

> Language: C# .NET 3.5 WPF

> Development Tools:

> Visual Studio 2010

> Download: Source

> Licence: MIT Licence

The project is not fully tested and completed, It may contain bugs. Do not use it in production.

## Theories

– Using thread simulate multi client to download resource from web hosts that supports partial-content.
– Divide file into download blocks and each thread treats one block


    /// <summary>
    /// Get server response.
    /// </summary>
    /// <param name="RangePtr"></param>
    /// <returns></returns>
    internal HttpWebResponse GetServerResponse(DownBlock block = null)
    {
        //Only one thread call one time
        lock (requestLock)
        {
            //Create web request
            HttpWebRequest request;
            try
            {
                request = (HttpWebRequest)WebRequest.Create(new Uri(RemoteAddr));
            }
            catch (NotSupportedException)
            {
                return null;
            }

            //Set web request method
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = 1000;
            if (block != null)
            { request.AddRange((int)block.Start); }
            else
            { request.AddRange(0); }
            request.ServicePoint.ConnectionLimit = 1000; //Support multi-connection.

            //return web request
            try
            {
                return (HttpWebResponse)request.GetResponse();
            }
            catch (WebException ex)
            {
                Logger.log(ex);
                return null;
            }
        }
    }
