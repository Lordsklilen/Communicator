#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Communicator.Website/Communicator.Website.csproj", "Communicator.Website/"]
COPY ["Communicator.DataProvider/Communicator.DataProvider.csproj", "Communicator.DataProvider/"]
COPY ["Communicator.Service/Communicator.Service.csproj", "Communicator.Service/"]
RUN dotnet restore "Communicator.Website/Communicator.Website.csproj"
COPY . .
WORKDIR "/src/Communicator.Website"
RUN dotnet build "Communicator.Website.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Communicator.Website.csproj" -c Release -o /app/publish

RUN npm install
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Communicator.Website.dll"]